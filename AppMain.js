import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';

// Import pet wallet components
import VaccinationList from './src/features/pet-wallet/vaccination-list';
import PrescriptionList from './src/features/pet-wallet/prescription-list';
import VetVisitList from './src/features/pet-wallet/vet-visit-list';
import AddVaccination from './src/features/pet-wallet/add-vaccination';
import EditVaccination from './src/features/pet-wallet/edit-vaccination';
import RecordDetails from './src/features/pet-wallet/record-details';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [navigationParams, setNavigationParams] = useState(null);

  const navigate = (view, params = null) => {
    setCurrentView(view);
    setNavigationParams(params);
  };

  const onBack = () => {
    if (currentView === 'home') return;
    if (currentView === 'recordDetails' && navigationParams?.from) {
      setCurrentView(navigationParams.from);
    } else {
      setCurrentView('home');
    }
    setNavigationParams(null);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'vaccinations':
        return <VaccinationList onBack={onBack} navigate={navigate} />;
      case 'prescriptions':
        return <PrescriptionList onBack={onBack} navigate={navigate} />;
      case 'vetVisits':
        return <VetVisitList onBack={onBack} navigate={navigate} />;
      case 'addVaccination':
        return <AddVaccination onBack={onBack} navigate={navigate} params={navigationParams} />;
      case 'editVaccination':
        return <EditVaccination onBack={onBack} navigate={navigate} params={navigationParams} />;
      case 'recordDetails':
        return <RecordDetails onBack={onBack} navigate={navigate} params={navigationParams} />;
      default:
        return (
          <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFF9F5" />
            <View style={styles.header}>
              <Text style={styles.title}>Pet Medical Wallet</Text>
            </View>
            <View style={styles.content}>
              <TouchableOpacity style={styles.card} onPress={() => navigate('vaccinations')}>
                <Text style={styles.cardTitle}>Vaccinations</Text>
                <Text style={styles.cardDesc}>Manage vaccination records</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.card} onPress={() => navigate('prescriptions')}>
                <Text style={styles.cardTitle}>Prescriptions</Text>
                <Text style={styles.cardDesc}>Track medications</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.card} onPress={() => navigate('vetVisits')}>
                <Text style={styles.cardTitle}>Vet Visits</Text>
                <Text style={styles.cardDesc}>Record vet appointments</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        );
    }
  };

  return renderCurrentView();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F5',
  },
  header: {
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  cardDesc: {
    fontSize: 14,
    color: '#666',
  },
});