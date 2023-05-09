import React, { useCallback } from 'react';
import useMovies from './useMovies';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Movie from './Movie';
import Colors from 'open-color';
import Screen from '../../components/Screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  movieList: {
    padding: 20,
  },
  separator: {
    height: 16,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerRightComponent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alarmButton: {},
  alarmIcon: {
    fontSize: 24,
    color: Colors.white,
  },
});

export default () => {
  const { movies, isLoading, loadMore, canLoadMore, refresh } = useMovies();
  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const renderRightComponent = useCallback(() => {
    return (
      <View style={styles.headerRightComponent}>
        <TouchableOpacity
          style={styles.alarmButton}
          onPress={() => {
            navigate('Reminders');
          }}>
          <Icon name="notifications" style={styles.alarmIcon} />
        </TouchableOpacity>
      </View>
    );
  }, [navigate]);

  return (
    <Screen renderRightComponent={renderRightComponent}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator />
        </View>
      ) : (
        <FlatList
          //   그냥 style 줄경우 맨 밑부분이 짤리는 이슈가있음
          contentContainerStyle={styles.movieList}
          data={movies}
          renderItem={({ item: movie }) => (
            <Movie
              id={movie.id}
              title={movie.title}
              originalTitle={movie.originalTitle}
              releaseDate={movie.releaseDate}
              overview={movie.overview}
              posterUrl={movie.posterUrl ?? undefined}
            />
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          onEndReached={() => {
            if (canLoadMore) {
              loadMore();
            }
          }}
          //   pull to refresh
          refreshControl={
            <RefreshControl
              tintColor={Colors.white}
              refreshing={isLoading}
              onRefresh={refresh}
            />
          }
        />
      )}
    </Screen>
  );
};
