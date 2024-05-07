import 'package:flutter/material.dart';
import 'package:basketball_kuroko_wiki/view/home_screen.dart';
import 'package:basketball_kuroko_wiki/view/author_list_screen.dart';
import 'package:basketball_kuroko_wiki/view/character_list.dart';
import 'package:basketball_kuroko_wiki/view/news_list_screen.dart';

void main() => runApp(const KurokoLegacy());

class KurokoLegacy extends StatelessWidget {
  const KurokoLegacy({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Basketball Kuroko Wiki',
      theme: ThemeData(
        visualDensity: VisualDensity.adaptivePlatformDensity, colorScheme: ColorScheme.fromSwatch(primarySwatch: Colors.deepOrange).copyWith(background: Color(0xFFF88158)), // Background color set to #F88158
      ),
      initialRoute: '/',
      routes: {
        '/': (context) => MainScreen(),
        '/listOfAuthors': (context) => AuthorListScreen(),
        '/listOfCharacters': (context) => CharacterListScreen(),
        '/listOfNews': (context) => const NewsListScreen(),
      },
    );
  }
}
