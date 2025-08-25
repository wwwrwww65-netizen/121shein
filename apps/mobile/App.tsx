import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Text, View, ScrollView } from 'react-native';
import { TRPCProvider, trpc } from './src/lib/trpc';
import { Button } from '@repo/ui/Button';

const ProductList = () => {
  const { data: products, isLoading, error } = trpc.product.getAll.useQuery();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>جاري تحميل المنتجات...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>حدث خطأ: {error.message}</Text>
      </View>
    );
  }

  return (
    <ScrollView className="p-4">
      {products?.map((product) => (
        <View key={product.id} className="mb-4 p-4 border border-gray-200 rounded-lg bg-white">
          <Text className="text-xl font-bold mb-2">{product.name}</Text>
          <Text className="text-lg text-primary mb-4">{product.price.toFixed(2)} ر.س.</Text>
          <Button>أضف إلى السلة</Button>
        </View>
      ))}
    </ScrollView>
  );
};

const App = () => {
  return (
    <TRPCProvider>
      <SafeAreaView className="flex-1 bg-secondary">
        <StatusBar style="auto" />
        <View className="p-4 bg-white border-b border-gray-200">
          <Text className="text-2xl font-bold text-center text-primary">متجرنا</Text>
        </View>
        <ProductList />
      </SafeAreaView>
    </TRPCProvider>
  );
};

export default App;
