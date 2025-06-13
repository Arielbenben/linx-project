import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    ScrollView,
    Dimensions,
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

    const values = chartData.map((item) => item.y);
    const labels = chartData.map((item, index) =>
        index % 2 === 0 ? item.x : ''
    );


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
                    {/* כותרת ממורכזת בתוך הקומפוננטה */}
                    <View
                        style={{
                            backgroundColor: '#2B2428',
                            paddingVertical: 8,
                            paddingHorizontal: 16,
                            borderRadius: 12,
                            alignSelf: 'center', // מרכז את הכותרת
                            marginBottom: 12,
                        }}
                    >
                        <Text
                            style={{
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: 14,
                                textAlign: 'center',
                            }}
                        >
                            לקוחות חדשים
                        </Text>
                    </View>

                    {/* הגרף עצמו */}
                    <LineChart
                        data={{
                            labels: chartData.map((item, index) =>
                                index % 2 === 0 ? item.x : ''
                            ),
                            datasets: [
                                {
                                    data: chartData.map((item) => item.y),
                                    color: () => '#FF3C00',
                                    strokeWidth: 3,
                                },
                            ],
                        }}
                        width={screenWidth - 32}
                        height={260}
                        fromZero={true}
                        yAxisInterval={1}
                        chartConfig={{
                            backgroundColor: '#1C1618',
                            backgroundGradientFrom: '#1C1618',
                            backgroundGradientTo: '#1C1618',
                            decimalPlaces: 0,
                            color: () => '#FF3C00',
                            labelColor: () => '#FFFFFF',
                            propsForBackgroundLines: {
                                stroke: '#555',
                                strokeDasharray: '',
                            },
                            propsForVerticalLabels: {
                                fontSize: 10,
                                fontWeight: 'bold',
                            },
                            propsForHorizontalLabels: {
                                fontSize: 10,
                            },
                            propsForDots: {
                                r: '0',
                            },
                        }}
                        withInnerLines={true}
                        withVerticalLines={false}
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
                        decorator={({ width, height }: { width: number; height: number }) => (
                            <>
                                <View
                                    style={{
                                        position: 'absolute',
                                        left: 58,
                                        top: height - 40,
                                        width: width - 65,
                                        height: 2,
                                        backgroundColor: 'white',
                                    }}
                                />
                                <View
                                    style={{
                                        position: 'absolute',
                                        left: 58,
                                        top: 10,
                                        width: 2,
                                        height: height - 50,
                                        backgroundColor: 'white',
                                    }}
                                />
                                {tooltipPos.visible && (
                                    <View
                                        style={{
                                            position: 'absolute',
                                            left: tooltipPos.x - 30,
                                            top: tooltipPos.y - 40,
                                            backgroundColor: '#FF3C00',
                                            padding: 6,
                                            borderRadius: 6,
                                            zIndex: 100,
                                        }}
                                    >
                                        <Text style={{ color: '#fff', fontSize: 12 }}>
                                            {tooltipPos.value.toFixed(0)}
                                        </Text>
                                    </View>
                                )}
                            </>
                        )}
                    />
                </View>


            )}
        </ScrollView>
    );
}
