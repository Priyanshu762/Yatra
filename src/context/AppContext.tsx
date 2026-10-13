import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Destination, TourPackage, Vehicle, Driver, Booking, PaymentRecord } from '../types';

import {
  INITIAL_DESTINATIONS,
  INITIAL_PACKAGES,
  INITIAL_VEHICLES,
  INITIAL_DRIVERS,
  INITIAL_BOOKINGS,
  INITIAL_PAYMENTS
} from '../data';

interface AppContextType {
  destinations: Destination[];
  packages: TourPackage[];
  vehicles: Vehicle[];
  drivers: Driver[];
  bookings: Booking[];
  payments: PaymentRecord[];
  
  // Package Management
  addPackage: (pkg: TourPackage) => void;
  updatePackage: (pkg: TourPackage) => void;
  deletePackage: (id: string) => void;

  // Destination Management
  addDestination: (dest: Destination) => void;
  updateDestination: (dest: Destination) => void;
  deleteDestination: (id: string) => void;

  // Vehicle & Driver Management
  addVehicle: (v: Vehicle) => void;
  updateVehicle: (v: Vehicle) => void;
  deleteVehicle: (id: string) => void;
  addDriver: (d: Driver) => void;
  updateDriver: (d: Driver) => void;
  deleteDriver: (id: string) => void;

  // Bookings & Allocation
  createBooking: (newBooking: Omit<Booking, 'id' | 'createdAt'>) => Booking;
  updateBookingStatus: (id: string, status: Booking['bookingStatus']) => void;
  cancelBooking: (id: string) => void;
  assignVehicleAndDriver: (bookingId: string, vehicleId: string, driverId?: string) => { success: boolean; error?: string };
  checkAllocationConflict: (
    bookingId: string,
    vehicleId: string,
    driverId?: string,
    startDate?: string,
    endDate?: string
  ) => { vehicleConflict?: string; driverConflict?: string };

  // Payments
  processSimulatedRefund: (bookingId: string) => void;

  // Reset
  resetDemoData: () => void;

  // Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  DESTINATIONS: 'ya_destinations_v1',
  PACKAGES: 'ya_packages_v1',
  VEHICLES: 'ya_vehicles_v1',
  DRIVERS: 'ya_drivers_v1',
  BOOKINGS: 'ya_bookings_v1',
  PAYMENTS: 'ya_payments_v1',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [destinations, setDestinations] = useState<Destination[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.DESTINATIONS);
    return saved ? JSON.parse(saved) : INITIAL_DESTINATIONS;
  });

  const [packages, setPackages] = useState<TourPackage[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PACKAGES);
    return saved ? JSON.parse(saved) : INITIAL_PACKAGES;
  });

  const [vehicles, setVehicles] = useState<Vehicle[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.VEHICLES);
    return saved ? JSON.parse(saved) : INITIAL_VEHICLES;
  });

  const [drivers, setDrivers] = useState<Driver[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.DRIVERS);
    return saved ? JSON.parse(saved) : INITIAL_DRIVERS;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [payments, setPayments] = useState<PaymentRecord[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PAYMENTS);
    return saved ? JSON.parse(saved) : INITIAL_PAYMENTS;
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 4000);
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DESTINATIONS, JSON.stringify(destinations));
  }, [destinations]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(packages));
  }, [packages]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.VEHICLES, JSON.stringify(vehicles));
  }, [vehicles]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DRIVERS, JSON.stringify(drivers));
  }, [drivers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(payments));
  }, [payments]);

  // Packages
  const addPackage = (pkg: TourPackage) => {
    setPackages((prev) => [pkg, ...prev]);
    showToast(`Package "${pkg.title}" created successfully.`);
  };

  const updatePackage = (updated: TourPackage) => {
    setPackages((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    showToast(`Package "${updated.title}" updated.`);
  };

  const deletePackage = (id: string) => {
    setPackages((prev) => prev.filter((p) => p.id !== id));
    showToast(`Package removed.`);
  };

  // Destinations
  const addDestination = (dest: Destination) => {
    setDestinations((prev) => [...prev, dest]);
    showToast(`Destination "${dest.name}" added.`);
  };

  const updateDestination = (updated: Destination) => {
    setDestinations((prev) => prev.map((d) => (d.id === updated.id ? updated : d)));
    showToast(`Destination "${updated.name}" updated.`);
  };

  const deleteDestination = (id: string) => {
    setDestinations((prev) => prev.filter((d) => d.id !== id));
    showToast(`Destination removed.`);
  };

  // Vehicles
  const addVehicle = (v: Vehicle) => {
    setVehicles((prev) => [...prev, v]);
    showToast(`Vehicle "${v.name}" added to fleet.`);
  };

  const updateVehicle = (v: Vehicle) => {
    setVehicles((prev) => prev.map((item) => (item.id === v.id ? v : item)));
    showToast(`Vehicle "${v.name}" details updated.`);
  };

  const deleteVehicle = (id: string) => {
    setVehicles((prev) => prev.filter((v) => v.id !== id));
    showToast(`Vehicle removed from active fleet.`);
  };

  // Drivers
  const addDriver = (d: Driver) => {
    setDrivers((prev) => [...prev, d]);
    showToast(`Chauffeur "${d.name}" onboarded.`);
  };

  const updateDriver = (d: Driver) => {
    setDrivers((prev) => prev.map((item) => (item.id === d.id ? d : item)));
    showToast(`Chauffeur profile updated.`);
  };

  const deleteDriver = (id: string) => {
    setDrivers((prev) => prev.filter((d) => d.id !== id));
    showToast(`Chauffeur record removed.`);
  };

  // Helper date overlap
  const datesOverlap = (startA: string, endA: string, startB: string, endB: string) => {
    return startA <= endB && endA >= startB;
  };

  // Conflict detection
  const checkAllocationConflict = (
    bookingId: string,
    vehicleId: string,
    driverId?: string,
    startDate?: string,
    endDate?: string
  ) => {
    const currentBooking = bookings.find((b) => b.id === bookingId);
    const start = startDate || currentBooking?.travelDate || '';
    const end = endDate || currentBooking?.endDate || '';

    let vehicleConflict: string | undefined = undefined;
    let driverConflict: string | undefined = undefined;

    const activeBookings = bookings.filter(
      (b) =>
        b.id !== bookingId &&
        (b.bookingStatus === 'Confirmed' || b.bookingStatus === 'In Progress')
    );

    for (const b of activeBookings) {
      if (datesOverlap(start, end, b.travelDate, b.endDate)) {
        if (b.vehicleId === vehicleId) {
          vehicleConflict = `Vehicle is already reserved for booking ${b.id} (${b.customerName}) from ${b.travelDate} to ${b.endDate}`;
        }
        if (driverId && b.assignedDriverId === driverId) {
          driverConflict = `Chauffeur is already assigned to booking ${b.id} (${b.customerName}) from ${b.travelDate} to ${b.endDate}`;
        }
      }
    }

    return { vehicleConflict, driverConflict };
  };

  // Assign vehicle and driver
  const assignVehicleAndDriver = (
    bookingId: string,
    vehicleId: string,
    driverId?: string
  ): { success: boolean; error?: string } => {
    const currentBooking = bookings.find((b) => b.id === bookingId);
    if (!currentBooking) return { success: false, error: 'Booking not found' };

    const conflicts = checkAllocationConflict(
      bookingId,
      vehicleId,
      driverId,
      currentBooking.travelDate,
      currentBooking.endDate
    );

    if (conflicts.vehicleConflict) {
      return { success: false, error: conflicts.vehicleConflict };
    }
    if (conflicts.driverConflict) {
      return { success: false, error: conflicts.driverConflict };
    }

    const selectedVehicle = vehicles.find((v) => v.id === vehicleId);
    const selectedDriver = driverId ? drivers.find((d) => d.id === driverId) : undefined;

    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId) {
          return {
            ...b,
            vehicleId,
            vehicleName: selectedVehicle ? selectedVehicle.name : b.vehicleName,
            assignedDriverId: driverId,
            assignedDriverName: selectedDriver ? selectedDriver.name : undefined,
          };
        }
        return b;
      })
    );

    showToast(`Vehicle and Chauffeur successfully assigned to Booking ${bookingId}`);
    return { success: true };
  };

  // Booking creation
  const createBooking = (newBookingData: Omit<Booking, 'id' | 'createdAt'>): Booking => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newId = `YA-${randomNum}`;
    const newBooking: Booking = {
      ...newBookingData,
      id: newId,
      createdAt: new Date().toISOString(),
    };

    setBookings((prev) => [newBooking, ...prev]);

    // Create payment entry
    const newPayment: PaymentRecord = {
      id: `PAY-${Math.floor(1000 + Math.random() * 9000)}`,
      bookingId: newId,
      customerName: newBooking.customerName,
      amount: newBooking.totalAmount,
      method: newBooking.paymentMethod,
      status: 'Paid',
      transactionId: newBooking.transactionId,
      timestamp: new Date().toISOString(),
      gatewayRef: `SIM-${newBooking.paymentMethod.toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`,
    };

    setPayments((prev) => [newPayment, ...prev]);
    showToast(`Journey confirmed! Reference: ${newId}`);
    return newBooking;
  };

  const updateBookingStatus = (id: string, status: Booking['bookingStatus']) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, bookingStatus: status } : b))
    );
    showToast(`Booking ${id} status updated to ${status}.`);
  };

  const cancelBooking = (id: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id
          ? {
              ...b,
              bookingStatus: 'Cancelled',
              paymentStatus: b.paymentStatus === 'Paid' ? 'Refunded' : b.paymentStatus,
            }
          : b
      )
    );
    // Mark payment refunded if paid
    setPayments((prev) =>
      prev.map((p) =>
        p.bookingId === id ? { ...p, status: 'Refunded' } : p
      )
    );
    showToast(`Booking ${id} has been cancelled and simulated refund queued.`);
  };

  const processSimulatedRefund = (bookingId: string) => {
    setPayments((prev) =>
      prev.map((p) =>
        p.bookingId === bookingId ? { ...p, status: 'Refunded' } : p
      )
    );
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId ? { ...b, paymentStatus: 'Refunded' } : b
      )
    );
    showToast(`Simulated refund processed for booking ${bookingId}.`);
  };

  const resetDemoData = () => {
    setDestinations(INITIAL_DESTINATIONS);
    setPackages(INITIAL_PACKAGES);
    setVehicles(INITIAL_VEHICLES);
    setDrivers(INITIAL_DRIVERS);
    setBookings(INITIAL_BOOKINGS);
    setPayments(INITIAL_PAYMENTS);

    localStorage.removeItem(STORAGE_KEYS.DESTINATIONS);
    localStorage.removeItem(STORAGE_KEYS.PACKAGES);
    localStorage.removeItem(STORAGE_KEYS.VEHICLES);
    localStorage.removeItem(STORAGE_KEYS.DRIVERS);
    localStorage.removeItem(STORAGE_KEYS.BOOKINGS);
    localStorage.removeItem(STORAGE_KEYS.PAYMENTS);

    showToast('Demo data successfully reset to original seed state.');
  };

  return (
    <AppContext.Provider
      value={{
        destinations,
        packages,
        vehicles,
        drivers,
        bookings,
        payments,
        addPackage,
        updatePackage,
        deletePackage,
        addDestination,
        updateDestination,
        deleteDestination,
        addVehicle,
        updateVehicle,
        deleteVehicle,
        addDriver,
        updateDriver,
        deleteDriver,
        createBooking,
        updateBookingStatus,
        cancelBooking,
        assignVehicleAndDriver,
        checkAllocationConflict,
        processSimulatedRefund,
        resetDemoData,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
