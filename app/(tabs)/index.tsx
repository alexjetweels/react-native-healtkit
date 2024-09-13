import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  FlatList,
} from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import AppleHealthKit, {
  HealthValue,
  HealthKitPermissions,
} from 'react-native-health';
import { useEffect, useState } from 'react';

export default function HomeScreen() {
  const [steps, setStepCount] = useState<HealthValue[]>([]);

  const options = {
    startDate: new Date(2020, 1, 1).toISOString(),
  };

  useEffect(() => {
    AppleHealthKit.getDailyStepCountSamples(
      options,
      (callbackError: string, results: HealthValue[]) => {
        console.log(results);

        setStepCount(results);
      }
    );
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <FlatList
        style={{ marginTop: 100 }}
        data={steps}
        renderItem={({ item }) => (
          <View>
            <Text>{item.startDate}</Text>

            <Text>{item.value}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
