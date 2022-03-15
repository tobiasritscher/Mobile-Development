import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const AnimalData = [
  {
    id: 1,
    title: 'Tiger',
  },
  {
    id: 2,
    title: 'Panther',
  },
  {
    id: 3,
    title: 'Rat',
  },
  {
    id: 4,
    title: 'Elefant',
  },
  {
    id: 5,
    title: 'Flamingo',
  },
  {
    id: 6,
    title: 'Maus',
  },
  {
    id: 7,
    title: 'Luchs',
  },
  {
    id: 8,
    title: 'Nashorn',
  },
  {
    id: 9,
    title: 'Marder',
  },
  {
    id: 10,
    title: 'Puma',
  }
];


export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Know your Animal Prototype!</Text>
      <StatusBar style="auto" />
      <FlatListAnimals/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  title:{
    paddingTop: 50,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15,
    fontSize: 20,
    fontWeight: 'bold',
  },
  sectionHeader: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',

  },
  item1: {
    padding: 10,
    fontSize: 20,
    height: 60,
  },
  item2: {
    padding: 10,
    fontSize: 20,
    height: 60,
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
});

const FlatListAnimals = () => {
  return (
      <View style={styles.container}>
        <FlatList
            data={AnimalData}
            renderItem={({ item }) => <ItemRender element={item} />}
            ItemSeparatorComponent={ItemDivider}
        />
      </View>
  );
}

// @ts-ignore
const ItemRender = ({ element }) => (
    <View>
      <Text style={[styles.item1, (element.id % 2 == 0) && styles.item2]}>{element.title}</Text>
    </View>
);

const ItemDivider = () => {
  return (
      <View
          style={{
            height: 1,
            width: "100%",
            backgroundColor: "#607D8B",
          }}
      />
  );
}

