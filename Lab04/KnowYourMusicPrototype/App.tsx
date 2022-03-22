import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, Image } from 'react-native';

const MusicData = [
  {
    id: 1,
    title: 'What i got',
    artists: 'Sublime',
    icon: require('./img/1.jpg'),
  },
  {
    id: 2,
    title: 'Lonely Day',
    artists: 'System Of A Down',
    icon:  require('./assets/favicon.png'),
  },
  {
    id: 3,
    title: '21 Guns',
    artists: 'Green DAy',
    icon:  require('./assets/splash.png'),
  },
  {
    id: 4,
    title: 'The Man Who Sold The World',
    artists: 'DAvid Bowie',
    icon:  require('./assets/icon.png'),
  },
  {
    id: 5,
    title: 'Bad Day',
    artists: 'Daniel Powter',
    icon:  require('./img/1.jpg'),
  },
  {
    id: 6,
    title: 'House of Gold',
    artists: 'Twenty One Pilots',
    icon:  require('./img/2.jpg'),
  },
  {
    id: 7,
    title: 'Some Nights',
    artists: 'fun.',
    icon:  require('./img/3.jpg'),
  },
  {
    id: 8,
    title: 'I\'m So Sorry',
    artists: 'Imagine Dragons',
    icon:  require('./img/4.jpg'),
  },
  {
    id: 9,
    title: 'Teenagers',
    artists: 'My Chemical Romance',
    icon:  require('./img/1.jpg'),
  },
  {
    id: 10,
    title: 'Rockstar',
    artists: 'Nickelback',
    icon:  require('./img/2.jpg'),
  }
];


export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Know your Music Prototype!</Text>
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
  row1: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: 'green',
  },
  row2: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: 'red',
  },
  leftComponent: {
    width: '70%',
  },
  rightComponent: {
    width: '30%',
  },
  item1: {
    padding: 10,
    fontSize: 20,
  },
  item2: {
    padding: 10,
    fontSize: 20,
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  iconImage: {
    aspectRatio: 1,
    height: 100,
    width: 100,
    flex: 1,
  }
});

const FlatListAnimals = () => {
  return (
      <View>
        <FlatList
            data={MusicData}
            renderItem={({ item }) => <ItemRender element={item} />}
            ItemSeparatorComponent={ItemDivider}
        />
      </View>
  );
}

// @ts-ignore
const ItemRender = ({ element }) => (
    <View style={[styles.row1, (element.id % 2 == 0) && styles.row2]}>
      <View style={styles.leftComponent}>
        <Text style={styles.item1}>{element.title + '\n'+ element.artists}</Text>
      </View>
      <View style={styles.rightComponent}>
        <Image style={styles.iconImage} source={element.icon} />
      </View>
    </View>
);

const ItemDivider = () => {
  return (
      <View
          style={{
            height: 5,
            width: "100%",
            backgroundColor: "#000000",
          }}
      />
  );
}

