import React from 'react';
import useMovies from './useMovies';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, Platform, StatusBar, StyleSheet, View } from 'react-native';
import Movie from './Movie';
import Colors from 'open-color';

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
});

export default () => {
  const { movies } = useMovies();

  return (
    <SafeAreaView style={styles.container}>
      {/* ios는 어두운 배경 사용시 상단바 색을 바꿔주어야함 */}
      {Platform.OS === 'ios' ? (
        <StatusBar barStyle="light-content" />
      ) : (
        <StatusBar barStyle="dark-content" />
      )}

      <FlatList
        //   그냥 style 줄경우 맨 밑부분이 짤리는 이슈가있음
        contentContainerStyle={styles.movieList}
        data={movies}
        renderItem={({ item: movie }) => (
          <Movie
            title={movie.title}
            originalTitle={movie.originalTitle}
            releaseDate={movie.releaseDate}
            overview={movie.overview}
            posterUrl={movie.posterUrl ?? undefined}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
};