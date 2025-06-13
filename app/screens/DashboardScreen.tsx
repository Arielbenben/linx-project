import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useUser } from '../../context/UserContext';
import styles from './DashboardScreen.styles';

type ChartItem = {
  x: string;
  y: number;
};

export default function DashboardScreen() {
  const { smbId } = useUser();
  const [chartData, setChartData] = useState<ChartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{
    x: number;
    y: number;
    value: number;
    visible: boolean;
  }>({ x: 0, y: 0, value: 0, visible: false });

  useEffect(() => {
    async function fetchChartData() {
      try {
        const res = await fetch(
          `https://render-d9ko.onrender.com/api/analyze/new_customers/monthly/${smbId}`
        );
        const json = await res.json();

        const formatted: ChartItem[] = json.map((item: any) => ({
          x: `${new Date(item.month).getMonth() + 1}/${new Date(item.month)
            .getFullYear()
            .toString()
            .slice(2)}`,
          y: typeof item.others_avg === 'number' ? item.others_avg : 0,
        }));

        setChartData(formatted);
      } catch (err) {
        console.error('שגיאה בטעינת הנתונים:', err);
        setError('אירעה שגיאה בטעינת הנתונים');
      } finally {
        setLoading(false);
      }
    }

    if (smbId) {
      fetchChartData();
    }
  }, [smbId]);

  const labels = chartData.map((item) => item.x);
  const values = chartData.map((item) => item.y);
  const screenWidth = Dimensions.get('window').width;

  const chartKitData = {
    labels,
    datasets: [
      {
        data: values,
        color: () => '#5f3dc4',
        strokeWidth: 2,
      },
    ],
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>שלום!</Text>
      <Text style={styles.subtitle}>ברוך הבא ללוח הבקרה שלך</Text>

      {loading && (
        <ActivityIndicator size="large" color="#5f3dc4" style={{ marginTop: 30 }} />
      )}

      {error && (
        <Text style={{ color: 'red', textAlign: 'center', marginTop: 20 }}>
          {error}
        </Text>
      )}

      {!loading && !error && values.length > 0 && (
        <View style={{ padding: 16 }}>
          <LineChart
            data={chartKitData}
            width={screenWidth - 32}
            height={260}
            yAxisSuffix=""
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 2,
              color: () => '#5f3dc4',
              labelColor: () => '#000000',
              propsForDots: {
                r: '4',
                strokeWidth: '2',
                stroke: '#5f3dc4',
              },
            }}
            bezier
            style={{ borderRadius: 12 }}
            onDataPointClick={(data) => {
              const isSamePoint = tooltipPos.x === data.x && tooltipPos.y === data.y;
              setTooltipPos({
                x: data.x,
                y: data.y,
                value: data.value,
                visible: !isSamePoint || !tooltipPos.visible,
              });
            }}
            decorator={() => {
              return tooltipPos.visible ? (
                <View
                  style={{
                    position: 'absolute',
                    left: tooltipPos.x - 30,
                    top: tooltipPos.y - 40,
                    backgroundColor: '#5f3dc4',
                    padding: 6,
                    borderRadius: 6,
                    zIndex: 100,
                  }}
                >
                  <Text style={{ color: '#fff', fontSize: 12 }}>
                    {tooltipPos.value.toFixed(2)}
                  </Text>
                </View>
              ) : null;
            }}
          />
        </View>
      )}
    </ScrollView>
  );
}
