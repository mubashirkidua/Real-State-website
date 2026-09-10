import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  limit
} from 'firebase/firestore';
import firebaseConfigData from '../../firebase-applet-config.json';
import { Property, ViewingBooking, PropertyStatus, BookingStatus } from '../types';
import { INITIAL_PROPERTIES } from '../data/initialProperties';

const firebaseConfig = {
  projectId: firebaseConfigData.projectId,
  appId: firebaseConfigData.appId,
  apiKey: firebaseConfigData.apiKey,
  authDomain: firebaseConfigData.authDomain,
  firestoreDatabaseId: firebaseConfigData.firestoreDatabaseId,
  storageBucket: firebaseConfigData.storageBucket,
  messagingSenderId: firebaseConfigData.messagingSenderId,
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Auth helpers
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    // sync user document
    const user = result.user;
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || user.email?.split('@')[0] || 'User',
      photoURL: user.photoURL,
      lastLogin: Date.now()
    }, { merge: true });
    return user;
  } catch (error: any) {
    console.error('Google Sign-In Error:', error);
    throw error;
  }
};

export const registerWithEmail = async (name: string, email: string, pass: string) => {
  const result = await createUserWithEmailAndPassword(auth, email, pass);
  await updateProfile(result.user, { displayName: name });
  await setDoc(doc(db, 'users', result.user.uid), {
    uid: result.user.uid,
    email: result.user.email,
    displayName: name,
    photoURL: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`,
    createdAt: Date.now()
  });
  return result.user;
};

export const loginWithEmail = async (email: string, pass: string) => {
  const result = await signInWithEmailAndPassword(auth, email, pass);
  return result.user;
};

export const logoutUser = async () => {
  return signOut(auth);
};

// Seed properties if none exist in the database
let isSeeding = false;
export const seedPropertiesIfEmpty = async () => {
  if (isSeeding) return;
  try {
    const colRef = collection(db, 'properties');
    const snapshot = await getDocs(query(colRef, limit(1)));
    if (snapshot.empty) {
      isSeeding = true;
      console.log('Database properties collection is empty. Seeding initial luxury properties...');
      const batchPromises = INITIAL_PROPERTIES.map(async (prop) => {
        await addDoc(colRef, {
          ...prop,
          createdAt: Date.now()
        });
      });
      await Promise.all(batchPromises);
      console.log('Seeding completed successfully.');
    }
  } catch (err) {
    console.error('Failed to check or seed properties:', err);
  } finally {
    isSeeding = false;
  }
};

// Real-time listener for all properties
export const subscribeToProperties = (callback: (props: Property[]) => void) => {
  const colRef = collection(db, 'properties');
  const q = query(colRef, orderBy('createdAt', 'desc'));
  
  return onSnapshot(
    q,
    (snapshot) => {
      const list: Property[] = [];
      snapshot.forEach((docSnap) => {
        list.push({ id: docSnap.id, ...(docSnap.data() as Omit<Property, 'id'>) });
      });
      callback(list);
    },
    (error) => {
      console.error('Error listening to properties:', error);
      // Fallback to initial properties if permission or connection issue
      callback(
        INITIAL_PROPERTIES.map((p, index) => ({
          id: `local-seed-${index}`,
          ...p
        }))
      );
    }
  );
};

// Add new property
export const createProperty = async (propertyData: Omit<Property, 'id'>) => {
  const colRef = collection(db, 'properties');
  const docRef = await addDoc(colRef, {
    ...propertyData,
    createdAt: Date.now()
  });
  return docRef.id;
};

// Update property
export const editProperty = async (propertyId: string, propertyData: Partial<Property>) => {
  const docRef = doc(db, 'properties', propertyId);
  await updateDoc(docRef, {
    ...propertyData,
    updatedAt: Date.now()
  });
};

// Delete property
export const removeProperty = async (propertyId: string) => {
  const docRef = doc(db, 'properties', propertyId);
  await deleteDoc(docRef);
};

// Schedule a viewing booking
export const bookPropertyViewing = async (bookingData: Omit<ViewingBooking, 'id'>) => {
  const colRef = collection(db, 'bookings');
  const docRef = await addDoc(colRef, {
    ...bookingData,
    status: 'confirmed',
    createdAt: Date.now()
  });
  return docRef.id;
};

// Real-time listener for user bookings
export const subscribeToUserBookings = (userId: string, callback: (bookings: ViewingBooking[]) => void) => {
  const colRef = collection(db, 'bookings');
  const q = query(colRef, where('userId', '==', userId));
  
  return onSnapshot(
    q,
    (snapshot) => {
      const list: ViewingBooking[] = [];
      snapshot.forEach((docSnap) => {
        list.push({ id: docSnap.id, ...(docSnap.data() as Omit<ViewingBooking, 'id'>) });
      });
      // Sort newest first
      list.sort((a, b) => b.createdAt - a.createdAt);
      callback(list);
    },
    (error) => {
      console.error('Error listening to bookings:', error);
      callback([]);
    }
  );
};

// Admin: Real-time listener for ALL client viewing bookings / leads across platform
export const subscribeToAllBookings = (callback: (bookings: ViewingBooking[]) => void) => {
  const colRef = collection(db, 'bookings');
  
  return onSnapshot(
    colRef,
    (snapshot) => {
      const list: ViewingBooking[] = [];
      snapshot.forEach((docSnap) => {
        list.push({ id: docSnap.id, ...(docSnap.data() as Omit<ViewingBooking, 'id'>) });
      });
      list.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      callback(list);
    },
    (error) => {
      console.error('Error listening to all bookings:', error);
      callback([]);
    }
  );
};

// Admin: Update booking status (confirmed, completed, cancelled)
export const updateBookingStatus = async (bookingId: string, status: BookingStatus) => {
  const docRef = doc(db, 'bookings', bookingId);
  await updateDoc(docRef, {
    status,
    updatedAt: Date.now()
  });
};

// Admin: Delete booking
export const removeBooking = async (bookingId: string) => {
  const docRef = doc(db, 'bookings', bookingId);
  await deleteDoc(docRef);
};

// Admin: Update property status (available, under_offer, sold)
export const updatePropertyStatus = async (propertyId: string, status: PropertyStatus) => {
  const docRef = doc(db, 'properties', propertyId);
  await updateDoc(docRef, {
    status,
    updatedAt: Date.now()
  });
};
