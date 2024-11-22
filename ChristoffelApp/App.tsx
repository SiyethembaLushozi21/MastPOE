import React, { useEffect, useState, createContext, useContext, useMemo} from 'react';
import { View, Text, Image, Button, TouchableOpacity, TextInput, ToastAndroid, ScrollView, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import DropDownPicker from 'react-native-dropdown-picker';
import { launchImageLibrary } from 'react-native-image-picker';
import { NavigationProp } from '@react-navigation/native';
import { FlatList } from 'react-native';  
import { useDishes } from './DishesContext'
import { DishesProvider } from './DishesContext';
import { ReactNode } from 'react';
import { useNavigation } from '@react-navigation/native'; 

const sampleDishes = [
  { name: 'Starlight Risotto', category: 'main', price: 100, description: 'A creamy risotto, infused with herbs and Parmesan cheese.' },
  { name: 'Crimson Ember Steak', category: 'main', price: 150, description: 'Juicy steak with a smoky flavor and red wine reduction.' },
  { name: 'Golden Bread Sticks', category: 'starter', price: 180, description: 'Warm, crispy breadsticks with garlic butter.' },
  { name: 'Twilight Tiramisu', category: 'dessert', price: 100, description: 'Classic dessert with coffee-soaked ladyfingers and mascarpone.' },
  { name: 'Emerald Soup', category: 'starter', price: 400, description: 'A creamy soup made from fresh green vegetables.' },
];
const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  useEffect(() => {
    // Hide the splash screen after 3 seconds
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
  }, []);

  return (
    <DishesProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Choice"
            component={Choice}
            options={{ title: 'Choose Role' }}
          />
          <Stack.Screen
            name="Main"
            component={MainScreen}
            options={{ title: 'Christoffel' }}
          />
          <Stack.Screen
            name="Filter"
            component={FilterScreen}
            options={{ title: 'Filter Dishes' }}
          />
          <Stack.Screen
            name="CustomDish"
            component={CustomDishScreen}
            options={{ title: 'Add Custom Dish' }}
          />
          <Stack.Screen
            name="PaymentScreen"
            component={PaymentScreen}
            options={{ title: 'Payment' }}
          />
          <Stack.Screen
            name="AddToFilterScreen"
            component={AddToFilterScreen}
            options={{ title: 'Chef Screen' }}
          />
          <Stack.Screen
            name="StartersScreen"
            component={StartersScreen}
            options={{ title: 'Starters' }}
          />
          <Stack.Screen
            name="MainCourseScreen"
            component={MainCourseScreen}
            options={{ title: 'Main Courses' }}
          />
          <Stack.Screen
            name="DessertScreen"
            component={DessertScreen}
            options={{ title: 'Desserts' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </DishesProvider>
  );
};

type Props = {
  navigation: NavigationProp<any>;
};

const Splash: React.FC<Props> = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Choice'); // Use navigate instead of replace
    }, 3000);
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'orange' }}>
      <Image source={require('./assets/christofelopen.png')} />
    </View>
  );
};

const AddToFilterScreen: React.FC = () => {
  const { dishes, updateDishCount } = useDishes();  // Renamed from updateCount to updateDishCount
  console.log(dishes); // Debugging: Logs the fetched data

  return (
    <ScrollView style={{ padding: 20, backgroundColor: '#90EE90' }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 20,
          color: 'black',
          textAlign: 'center',
          fontFamily: 'Georgia',
        }}
      >
        Manage Dishes
      </Text>

      {['dessert', 'main', 'starter'].map((category) => (
        <View key={category} style={{ marginBottom: 30 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              marginBottom: 10,
              color: 'black',
            }}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}s
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
            {dishes
              .filter((dish) => dish.category === category)
              .map((dish) => (
                <View
                  key={dish.id}
                  style={{
                    borderWidth: 1,
                    borderColor: '#006400',
                    borderRadius: 10,
                    width: '45%',
                    margin: 5,
                    backgroundColor: '#FFF',
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    source={{ uri: dish.image }}
                    style={{ width: '100%', height: 150 }}
                  />
                  <View
                    style={{
                      padding: 10,
                      alignItems: 'center',
                      backgroundColor: '#006400',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '600',
                        marginBottom: 5,
                        color: '#FFF',
                      }}
                    >
                      {dish.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '400',
                        color: '#FFF',
                        marginBottom: 10,
                      }}
                    >
                      Price: R{dish.price}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => updateDishCount(dish.id, -1)}  // Renamed to updateDishCount
                        style={{
                          backgroundColor: '#E74C3C',
                          padding: 10,
                          borderRadius: 5,
                        }}
                      >
                        <Text style={{ color: '#FFF', fontWeight: 'bold' }}>-</Text>
                      </TouchableOpacity>
                      <Text
                        style={{
                          marginHorizontal: 10,
                          color: '#FFF',
                          fontWeight: 'bold',
                        }}
                      >
                        {dish.count}
                      </Text>
                      <TouchableOpacity
                        onPress={() => updateDishCount(dish.id, 1)}  // Renamed to updateDishCount
                        style={{
                          backgroundColor: '#2ECC71',
                          padding: 10,
                          borderRadius: 5,
                        }}
                      >
                        <Text style={{ color: '#FFF', fontWeight: 'bold' }}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const MainScreen: React.FC<Props> = ({ navigation }) => {
  const { totalDishes: totalMainDishes, averagePrice: avgMainPrice } = calculateCategoryAverages('main');

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#90EE90', padding: 20 }}>
      <Text style={{ fontSize: 32, color: 'white', textAlign: 'center' }}>Christoffel</Text>

      <TouchableOpacity onPress={() => navigation.navigate('Filter')} style={{ position: 'absolute', right: 10, top: 10 }}>
        <Text style={{ color: 'grey', fontSize: 16 }}>Filter</Text>
      </TouchableOpacity>

      <View style={{ alignItems: 'center', marginTop: 40 }}>
        <Image
          source={require('./assets/sushi cake.jpg')}
          style={{ width: 348, height: 123, borderRadius: 15 }}
        />
        <Text style={{ fontSize: 28, color: 'white', marginTop: 10 }}>sushi cake</Text>
        <Text style={{ color: 'white', fontSize: 16, marginTop: 10 }}>Price: R400</Text>
        <View style={{ marginTop: 10 }}>
        <Button title="Order" color="green" onPress={() => navigation.navigate('PaymentScreen')} />
        </View>

        <Image
          source={require('./assets/prawns.jpg')}
          style={{ width: 348, height: 123, marginTop: 30, borderRadius: 15 }}
        />
        <Text style={{ fontSize: 28, color: 'white', marginTop: 10 }}>prawns.jpg</Text>
        <Text style={{ color: 'white', fontSize: 16, marginTop: 10 }}>Price: R200</Text>
        <View style={{ marginTop: 10 }}>
        <Button title="Order" color="green" onPress={() => navigation.navigate('PaymentScreen')} />

        </View>
      </View>

      <View style={{ alignItems: 'center', marginTop: 40 }}>
        <Button title="Custom Dish" color="grey" onPress={() => navigation.navigate('CustomDish')} />
      </View>

      <Text style={{ color: 'white', marginTop: 20, textAlign: 'center' }}>Main Dishes: {totalMainDishes}</Text>
      <Text style={{ color: 'white', textAlign: 'center' }}>Average Price: R{avgMainPrice}</Text>
    </ScrollView>
  );
};

const Choice: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#90EE90' }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 20,
          color: '#F5E1A4', // Christoffel yellow
          fontFamily: 'Georgia', // Elegant font for Christoffel brand
        }}
      >
        Choose Your Role
      </Text>

      <TouchableOpacity
        style={{
          backgroundColor: '#006400', // Christoffel dark gold color
          padding: 15,
          borderRadius: 10,
          marginVertical: 10,
          width: '80%',
          alignItems: 'center',
        }}
        onPress={() => navigation.navigate('AddToFilterScreen')}
      >
        <Text
          style={{
            color: '#FFF', // White text for readability
            fontSize: 18,
          }}
        >
          Chef
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: '#006400', // Christoffel dark gold color
          padding: 15,
          borderRadius: 10,
          marginVertical: 10,
          width: '80%',
          alignItems: 'center',
        }}
        onPress={() => navigation.navigate('Main')}
      >
        <Text
          style={{
            color: '#FFF', // White text for readability
            fontSize: 18,
          }}
        >
          User
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const calculateCategoryAverages = (category: string) => {
  const dishes = sampleDishes.filter(dish => dish.category === category);
  const totalDishes = dishes.length;
  const totalPrice = dishes.reduce((sum, dish) => sum + dish.price, 0);
  const averagePrice = totalDishes > 0 ? totalPrice / totalDishes : 0;
  return { totalDishes, averagePrice: averagePrice.toFixed(2) };
};

const FilterScreen: React.FC<Props> = ({ navigation }) => {
  const { selectedDishes } = useDishes();

  // Calculate the total price using useMemo to optimize recalculation
  const total = useMemo(() => {
    return selectedDishes.reduce((total, dish) => total + dish.price * dish.count, 0);
  }, [selectedDishes]);  // Recalculate when selectedDishes changes

  return (
    <View style={{ flex: 1, backgroundColor: '#90EE90', padding: 20 }}>
      <Text
        style={{
          fontSize: 42,
          color: 'black',
          textAlign: 'center',
          fontWeight: 'bold',
          marginBottom: 20,
        }}
      >
        🍽️ Christoffel 🍷
      </Text>
      <Text
        style={{
          color: 'black',
          fontSize: 24,
          marginTop: 20,
          textAlign: 'center',
          marginBottom: 40,
        }}
      >
        Choose your meal and enjoy! 😊
      </Text>

      {/* Starters */}
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20,
          backgroundColor: '#228B22',
          borderRadius: 10,
          paddingVertical: 15,
          paddingHorizontal: 20,
          shadowColor: '#000',
          shadowOpacity: 0.3,
          shadowRadius: 4,
          shadowOffset: { width: 0, height: 2 },
          elevation: 5,
        }}
        onPress={() => navigation.navigate('StartersScreen')}
      >
        <Image
          source={require('./assets/starters.jpg')}
          style={{
            width: 60,
            height: 60,
            marginRight: 15,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: '#FFF',
          }}
        />
        <Text style={{ color: 'white', fontSize: 24, fontWeight: '500', flex: 1 }}>
          🥗 Starters - Fresh & Light
        </Text>
      </TouchableOpacity>

      {/* Main Course */}
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20,
          backgroundColor: '#228B22',
          borderRadius: 10,
          paddingVertical: 15,
          paddingHorizontal: 20,
          shadowColor: '#000',
          shadowOpacity: 0.3,
          shadowRadius: 4,
          shadowOffset: { width: 0, height: 2 },
          elevation: 5,
        }}
        onPress={() => navigation.navigate('MainCourseScreen')}
      >
        <Image
          source={require('./assets/main.jpg')}
          style={{
            width: 60,
            height: 60,
            marginRight: 15,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: '#FFF',
          }}
        />
        <Text style={{ color: 'white', fontSize: 24, fontWeight: '500', flex: 1 }}>
          🍝 Main - Delicious & Hearty
        </Text>
      </TouchableOpacity>

      {/* Dessert */}
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20,
          backgroundColor: '#228B22',
          borderRadius: 10,
          paddingVertical: 15,
          paddingHorizontal: 20,
          shadowColor: '#000',
          shadowOpacity: 0.3,
          shadowRadius: 4,
          shadowOffset: { width: 0, height: 2 },
          elevation: 5,
        }}
        onPress={() => navigation.navigate('DessertScreen')}
      >
        <Image
          source={require('./assets/dessert.jpg')}
          style={{
            width: 60,
            height: 60,
            marginRight: 15,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: '#FFF',
          }}
        />
        <Text style={{ color: 'white', fontSize: 24, fontWeight: '500', flex: 1 }}>
          🍰 Dessert - Sweet Treats
        </Text>
      </TouchableOpacity>

      {/* Total Section */}
      <View
        style={{
          position: 'absolute',
          bottom: 20,
          left: 20,
          right: 20,
          backgroundColor: '#228B22',
          padding: 15,
          borderRadius: 10,
          shadowColor: '#000',
          shadowOpacity: 0.3,
          shadowRadius: 4,
          shadowOffset: { width: 0, height: 2 },
          elevation: 5,
        }}
      >
      </View>
    </View>
  );
};

const CustomDishScreen: React.FC = () => {
  const [dishes, setDishes] = useState<{ name: string; description: string; price: number }[]>([]);
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleAddDish = () => {
    const numericPrice = parseFloat(price);
    if (dishName && description && !isNaN(numericPrice)) {
      setDishes([...dishes, { name: dishName, description, price: numericPrice }]);
      setDishName('');
      setDescription('');
      setPrice('');
    } else {
      ToastAndroid.show('Please enter valid details!', ToastAndroid.SHORT);
    }
  };

  const calculateAveragePrice = () => {
    if (dishes.length === 0) return 0;
    const total = dishes.reduce((sum, dish) => sum + dish.price, 0);
    return (total / dishes.length).toFixed(2);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#F5EFEF', padding: 20 }}>
      <Text style={{ fontSize: 32, color: 'black', textAlign: 'center' }}>Create Your Custom Dish</Text>

      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 18 }}>Dish Name:</Text>
        <TextInput
          value={dishName}
          onChangeText={setDishName}
          style={{
            borderWidth: 1,
            borderColor: 'gray',
            padding: 10,
            borderRadius: 5,
            marginBottom: 10,
          }}
          placeholder="Enter Dish Name"
        />

        <Text style={{ fontSize: 18 }}>Description:</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          style={{
            borderWidth: 1,
            borderColor: 'gray',
            padding: 10,
            borderRadius: 5,
            marginBottom: 10,
          }}
          placeholder="Enter Description"
        />

        <Text style={{ fontSize: 18 }}>Price:</Text>
        <TextInput
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
          style={{
            borderWidth: 1,
            borderColor: 'gray',
            padding: 10,
            borderRadius: 5,
            marginBottom: 20,
          }}
          placeholder="Enter Price"
        />

        <Button title="Add Dish" onPress={handleAddDish} color="#228B22" />
      </View>

      <View style={{ marginTop: 30 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Dishes Entered:</Text>
        {dishes.length > 0 ? (
          <View>
            {dishes.map((dish, index) => (
              <View key={index} style={{ marginTop: 10 }}>
                <Text style={{ fontSize: 18 }}>
                  {index + 1}. {dish.name} - R{dish.price}
                </Text>
                <Text style={{ fontSize: 16, color: 'gray' }}>Description: {dish.description}</Text>
              </View>
            ))}
            <Text style={{ fontSize: 18, marginTop: 20 }}>
              Total Dishes: {dishes.length}
            </Text>
            <Text style={{ fontSize: 18 }}>
              Average Price: R{calculateAveragePrice()}
            </Text>
          </View>
        ) : (
          <Text style={{ fontSize: 16, color: 'gray', marginTop: 10 }}>No dishes added yet.</Text>
        )}
      </View>
    </ScrollView>
  );
};




const MainCourseScreen: React.FC = () => {
  const { dishes, updateDishCount } = useDishes();
  const navigation = useNavigation(); // Assuming you want to add navigation functionality

  // State to track selected main courses and their quantities
  const [selectedDishes, setSelectedDishes] = useState<{ [key: string]: number }>({});

  // Function to calculate the total price
  const calculateTotal = () => {
    return Object.keys(selectedDishes).reduce((total, dishId) => {
      const dish = dishes.find((dish) => dish.id.toString() === dishId);
      if (dish) {
        return total + dish.price * selectedDishes[dishId];
      }
      return total;
    }, 0);
  };

  // Function to increase the quantity of a dish
  const increaseQuantity = (dishId: string) => {
    setSelectedDishes((prevState) => {
      const updatedState = { ...prevState, [dishId]: (prevState[dishId] || 0) + 1 };
      updateDishCount(Number(dishId), 1);
      return updatedState;
    });
  };

  // Function to decrease the quantity of a dish
  const decreaseQuantity = (dishId: string) => {
    setSelectedDishes((prevState) => {
      const currentQuantity = prevState[dishId] || 0;
      if (currentQuantity > 0) {
        const updatedState = { ...prevState, [dishId]: currentQuantity - 1 };
        updateDishCount(Number(dishId), -1);
        return updatedState;
      }
      return prevState;
    });
  };

  // Function to remove a dish from the selected list
  const removeDish = (dishId: string) => {
    setSelectedDishes((prevState) => {
      const newState = { ...prevState };
      delete newState[dishId];
      updateDishCount(Number(dishId), -prevState[dishId]);
      return newState;
    });
  };

  // Calculate the total price based on selected dishes
  const totalPrice = calculateTotal();

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#90EE90' }}>
      <Text
        style={{
          fontSize: 32,
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 20,
          color: '#6B3C00',
        }}
      >
        🍝 Main Courses
      </Text>
      <FlatList
        data={dishes.filter(dish => dish.category === 'main' && dish.count > 0)} // Filter main dishes
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 20,
              padding: 10,
              backgroundColor: '#FFF',
              borderRadius: 10,
              borderColor: '#FF3131',
              borderWidth: 1,
            }}
          >
            <Image
              source={{ uri: item.image }}
              style={{
                width: '100%',
                height: 150,
                borderRadius: 10,
              }}
            />
            <Text style={{ fontSize: 18, marginTop: 10, color: 'black' }}>{item.name}</Text>
            <Text style={{ fontSize: 16, marginTop: 5, color: 'black' }}>Available: {item.count}</Text>
            <Text style={{ fontSize: 16, marginTop: 5, color: 'black' }}>Price: ${item.price.toFixed(2)}</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
              <TouchableOpacity
                onPress={() => increaseQuantity(item.id.toString())}
                style={{
                  backgroundColor: '#FF3131',
                  padding: 10,
                  borderRadius: 10,
                  marginRight: 10,
                }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>+</Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 16, color: 'black' }}>Quantity: {selectedDishes[item.id.toString()] || 0}</Text>
              <TouchableOpacity
                onPress={() => decreaseQuantity(item.id.toString())}
                style={{
                  backgroundColor: '#006400',
                  padding: 10,
                  borderRadius: 10,
                  marginLeft: 10,
                }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>-</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => removeDish(item.id.toString())}
              style={{
                marginTop: 15,
                backgroundColor: '#006400',
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 10,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Total Price */}
      <TouchableOpacity
        onPress={() => navigation.navigate('PaymentScreen')} // Navigate to PaymentScreen
        style={{
          position: 'absolute',
          bottom: 20,
          left: 20,
          right: 20,
          backgroundColor: '#006400',
          padding: 15,
          borderRadius: 10,
          shadowColor: '#000',
          shadowOpacity: 0.3,
          shadowRadius: 4,
          shadowOffset: { width: 0, height: 2 },
          elevation: 5,
        }}
      >
        <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>
          Total: R{totalPrice.toFixed(2)}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  screenContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#442A00',
  },
  header: {
    fontSize: 32,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dishCard: {
    flexDirection: 'row',
    backgroundColor: '#6B3C00',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  dishImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  dishInfo: {
    flex: 1,
  },
  dishName: {
    fontSize: 20,
    color: 'white',
    fontWeight: '500',
  },
  dishPrice: {
    fontSize: 18,
    color: 'white',
    marginTop: 5,
  },
};

const DessertScreen: React.FC = () => {
  const { dishes } = useDishes(); // Get dishes data
  const navigation = useNavigation(); // Use the navigation hook

  // State to track the selected desserts and their quantities
  const [selectedDishes, setSelectedDishes] = useState<{ [key: string]: number }>({});

  // Function to calculate the total price
  const calculateTotal = () => {
    return Object.keys(selectedDishes).reduce((total, dishId) => {
      const dish = dishes.find((dish) => dish.id.toString() === dishId);
      if (dish) {
        return total + dish.price * selectedDishes[dishId];
      }
      return total;
    }, 0);
  };

  // Function to increase the quantity of a dish
  const increaseQuantity = (dishId: string) => {
    setSelectedDishes((prevState) => ({
      ...prevState,
      [dishId]: (prevState[dishId] || 0) + 1,
    }));
  };

  // Function to decrease the quantity of a dish
  const decreaseQuantity = (dishId: string) => {
    setSelectedDishes((prevState) => {
      const currentQuantity = prevState[dishId] || 0;
      if (currentQuantity > 0) {
        return {
          ...prevState,
          [dishId]: currentQuantity - 1,
        };
      }
      return prevState;
    });
  };

  // Function to remove a dish from the selected list
  const removeDish = (dishId: string) => {
    setSelectedDishes((prevState) => {
      const newState = { ...prevState };
      delete newState[dishId];
      return newState;
    });
  };

  // Calculate the total price based on selected dishes
  const totalPrice = calculateTotal();

  // Function to handle navigation to PaymentScreen
  const handleNavigateToPayment = () => {
    navigation.navigate('PaymentScreen', { totalPrice }); // Pass total price to the PaymentScreen
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#90EE90' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: 'black' }}>
        🍰 Desserts
      </Text>
      <FlatList
        data={dishes.filter((dish) => dish.category === 'dessert' && dish.count > 0)} // Filter dishes by category and ensure count > 0
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 20,
              borderColor: '#FF3131',
              borderWidth: 1,
              borderRadius: 10,
              padding: 10,
              backgroundColor: '#FFF',
            }}
          >
            <Image
              source={{ uri: item.image }}
              style={{ width: '100%', height: 150, borderRadius: 10 }}
            />
            <Text style={{ fontSize: 18, marginTop: 10, color: 'black' }}>{item.name}</Text>
            <Text style={{ fontSize: 16, marginTop: 5, color: 'black' }}>Available: {item.count}</Text>
            <Text style={{ fontSize: 16, marginTop: 5, color: 'black' }}>Price: R{item.price}</Text>

            {/* Quantity controls */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
              <TouchableOpacity
                onPress={() => increaseQuantity(item.id.toString())}
                style={{
                  backgroundColor: '#FF3131',
                  padding: 10,
                  borderRadius: 10,
                  marginRight: 10,
                }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>+</Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 16, color: 'black' }}>
                Quantity: {selectedDishes[item.id.toString()] || 0}
              </Text>
              <TouchableOpacity
                onPress={() => decreaseQuantity(item.id.toString())}
                style={{
                  backgroundColor: '#FF3131',
                  padding: 10,
                  borderRadius: 10,
                  marginLeft: 10,
                }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>-</Text>
              </TouchableOpacity>
            </View>

            {/* Remove button */}
            <TouchableOpacity
              onPress={() => removeDish(item.id.toString())}
              style={{
                marginTop: 15,
                backgroundColor: '#FF3131',
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 10,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Total Price */}
      <View
        style={{
          backgroundColor: '#006400',
          padding: 15,
          borderRadius: 10,
          shadowColor: '#000',
          shadowOpacity: 0.3,
          shadowRadius: 4,
          shadowOffset: { width: 0, height: 2 },
          elevation: 5,
          marginTop: 'auto', // Push it to the bottom of the screen
        }}
      >
        <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>
          Total: R{totalPrice.toFixed(2)}
        </Text>
      </View>

      {/* Total Button */}
      <TouchableOpacity
        onPress={handleNavigateToPayment}
        style={{
          backgroundColor: '#006400',
          paddingVertical: 15,
          marginTop: 20,
          borderRadius: 10,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Go to Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

type StartersScreenNavigationProp = StackNavigationProp<RootStackParamList, 'StartersScreen'>;

interface StartersScreenProps {
  navigation: StartersScreenNavigationProp;
}
const StartersScreen: React.FC<StartersScreenProps> = () => {
  const { dishes, updateDishCount } = useDishes();
  const navigation = useNavigation<StartersScreenNavigationProp>(); // Initialize the navigation hook with the type

  // State to track the selected starters and their quantities
  const [selectedDishes, setSelectedDishes] = useState<{ [key: string]: number }>({});

  // Function to calculate the total price
  const calculateTotal = () => {
    return Object.keys(selectedDishes).reduce((total, dishId) => {
      const dish = dishes.find((dish) => dish.id.toString() === dishId);
      if (dish) {
        return total + dish.price * selectedDishes[dishId];
      }
      return total;
    }, 0);
  };

  // Function to increase the quantity of a dish
  const increaseQuantity = (dishId: string) => {
    setSelectedDishes((prevState) => {
      const updatedState = { ...prevState, [dishId]: (prevState[dishId] || 0) + 1 };
      updateDishCount(Number(dishId), 1);
      return updatedState;
    });
  };

  // Function to decrease the quantity of a dish
  const decreaseQuantity = (dishId: string) => {
    setSelectedDishes((prevState) => {
      const currentQuantity = prevState[dishId] || 0;
      if (currentQuantity > 0) {
        const updatedState = { ...prevState, [dishId]: currentQuantity - 1 };
        updateDishCount(Number(dishId), -1);
        return updatedState;
      }
      return prevState;
    });
  };

  // Function to remove a dish from the selected list
  const removeDish = (dishId: string) => {
    setSelectedDishes((prevState) => {
      const newState = { ...prevState };
      delete newState[dishId];
      updateDishCount(Number(dishId), -prevState[dishId]);
      return newState;
    });
  };

  // Calculate the total price based on selected dishes
  const totalPrice = calculateTotal();

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#90EE90' }}>
      <Text
        style={{
          fontSize: 32,
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 20,
          color: 'black',
        }}
      >
        🥗 Starters - Fresh & Light
      </Text>
      <FlatList
        data={dishes.filter((dish) => dish.category === 'starter' && dish.count > 0)}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 20, padding: 10, backgroundColor: '#FFF', borderRadius: 10, borderColor: '#FF3131', borderWidth: 1 }}>
            <Image source={{ uri: item.image }} style={{ width: '100%', height: 150, borderRadius: 10 }} />
            <Text style={{ fontSize: 18, marginTop: 10, color: 'black' }}>{item.name}</Text>
            <Text style={{ fontSize: 16, marginTop: 5, color: 'black' }}>Available: {item.count}</Text>
            <Text style={{ fontSize: 16, marginTop: 5, color: 'black' }}>Price: R{item.price}</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
              <TouchableOpacity
                onPress={() => increaseQuantity(item.id.toString())}
                style={{ backgroundColor: '#FF3131', padding: 10, borderRadius: 10, marginRight: 10 }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>+</Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 16, color: 'black' }}>Quantity: {selectedDishes[item.id.toString()] || 0}</Text>
              <TouchableOpacity
                onPress={() => decreaseQuantity(item.id.toString())}
                style={{ backgroundColor: '#FF3131', padding: 10, borderRadius: 10, marginLeft: 10 }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>-</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => removeDish(item.id.toString())}
              style={{
                marginTop: 15,
                backgroundColor: '#0064001',
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 10,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Total Price - now clickable to navigate to PaymentScreen */}
      <TouchableOpacity
        onPress={() => navigation.navigate('PaymentScreen')} // Navigate to PaymentScreen
        style={{
          position: 'absolute',
          bottom: 20,
          left: 20,
          right: 20,
          backgroundColor: '#006400',
          padding: 15,
          borderRadius: 10,
          shadowColor: '#000',
          shadowOpacity: 0.3,
          shadowRadius: 4,
          shadowOffset: { width: 0, height: 2 },
          elevation: 5,
        }}
      >
        <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>
          Total: R{totalPrice.toFixed(2)}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const initialDishes = [
  { id: 1, name: 'Chocolate Cake', category: 'dessert', image: 'https://www.themealdb.com/images/media/meals/qrqywr1503066605.jpg', count: 0 },
  { id: 2, name: 'Apple Pie', category: 'dessert', image: 'https://www.themealdb.com/images/media/meals/yrstur1511816601.jpg', count: 0 },
  { id: 3, name: 'Cheesecake', category: 'dessert', image: 'https://www.themealdb.com/images/media/meals/qtqwwu1511792650.jpg', count: 0 },
  { id: 4, name: 'Ice Cream Sundae', category: 'dessert', image: 'https://www.themealdb.com/images/media/meals/tttxxp1511814083.jpg', count: 0 },
  { id: 5, name: 'Brownie', category: 'dessert', image: 'https://www.themealdb.com/images/media/meals/yypwwq1511304979.jpg', count: 0 },
  { id: 6, name: 'Grilled Chicken', category: 'main', image: 'https://www.themealdb.com/images/media/meals/1529446352.jpg', count: 0 },
  { id: 7, name: 'Steak', category: 'main', image: 'https://www.themealdb.com/images/media/meals/svprys1511176755.jpg', count: 0 },
  { id: 8, name: 'Pasta Carbonara', category: 'main', image: 'https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg', count: 0 },
  { id: 9, name: 'Salmon', category: 'main', image: 'https://www.themealdb.com/images/media/meals/ysxwuq1487323065.jpg', count: 0 },
  { id: 10, name: 'Vegetarian Burger', category: 'main', image: 'https://www.themealdb.com/images/media/meals/vvpprx1487325699.jpg', count: 0 },
  { id: 11, name: 'Caesar Salad', category: 'starter', image: 'https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg', count: 0 },
  { id: 12, name: 'Tomato Soup', category: 'starter', image: 'https://www.themealdb.com/images/media/meals/vptwyt1511450962.jpg', count: 0 },
  { id: 13, name: 'Garlic Bread', category: 'starter', image: 'https://www.themealdb.com/images/media/meals/qwtrtp1511814705.jpg', count: 0 },
  { id: 14, name: 'Bruschetta', category: 'starter', image: 'https://www.themealdb.com/images/media/meals/sxwquu1511462512.jpg', count: 0 },
  { id: 15, name: 'Spring Rolls', category: 'starter', image: 'https://www.themealdb.com/images/media/meals/uspvup1511643613.jpg', count: 0 },
];
const PaymentScreen: React.FC = () => {
  // Declare state variables before the return statement
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handlePayment = () => {
    // Show the payment processed message
    ToastAndroid.show('Payment Processed!', ToastAndroid.SHORT);

    // Simulate a short delay before showing the food notification
    setTimeout(() => {
      ToastAndroid.show('Your food will be ready soon!', ToastAndroid.SHORT);
    }, 1000); // 1-second delay for a better user experience
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#90EE90', padding: 20 }}>
      <Text style={{ fontSize: 32, color: 'white', textAlign: 'center' }}>Payment</Text>
      
      <TextInput
        placeholder="Card Number"
        placeholderTextColor="white"
        onChangeText={setCardNumber}
        keyboardType="numeric"
        style={{ borderBottomColor: 'white', borderBottomWidth: 1, marginTop: 20, color: 'white' }}
      />
      
      <TextInput
        placeholder="Expiry Date (MM/YY)"
        placeholderTextColor="white"
        onChangeText={setExpiryDate}
        style={{ borderBottomColor: 'white', borderBottomWidth: 1, marginTop: 20, color: 'white' }}
      />
      
      <TextInput
        placeholder="CVV"
        placeholderTextColor="white"
        onChangeText={setCvv}
        keyboardType="numeric"
        style={{ borderBottomColor: 'white', borderBottomWidth: 1, marginTop: 20, color: 'white' }}
      />
      
      <TouchableOpacity 
        onPress={handlePayment} 
        style={{ marginTop: 20, backgroundColor: '#006400', padding: 10 }}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>Submit Payment</Text>
      </TouchableOpacity>
    </View>
  );
};


export type RootStackParamList = {
  Splash: undefined;
  Choice: undefined;
  Main: undefined;
  Filter: undefined;
  CustomDish: undefined;
  PaymentScreen: undefined;
  AddToFilterScreen: undefined;
  StartersScreen: undefined;
  MainCourseScreen: undefined;
  DessertScreen: undefined;
};

export default App;
