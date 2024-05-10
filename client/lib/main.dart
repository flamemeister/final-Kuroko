import 'package:flutter/material.dart';
import 'package:basketball_kuroko_wiki/view/home_screen.dart';
import 'package:basketball_kuroko_wiki/view/author_list_screen.dart';
import 'package:basketball_kuroko_wiki/view/character_list.dart';
import 'package:basketball_kuroko_wiki/view/news_list_screen.dart';
import 'package:basketball_kuroko_wiki/view/register_screen.dart';
import 'package:basketball_kuroko_wiki/view/login_screen.dart';
import 'package:basketball_kuroko_wiki/view/calendar_screen.dart';

void main() => runApp(const KurokoLegacy());

class KurokoLegacy extends StatelessWidget {
  const KurokoLegacy({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Basketball Kuroko Wiki',
      theme: ThemeData(
        visualDensity: VisualDensity.adaptivePlatformDensity,
        colorScheme: ColorScheme.fromSwatch(primarySwatch: Colors.deepOrange)
            .copyWith(
                background:
                    const Color(0xFFF88158)), // Background color set to #F88158
      ),
      initialRoute: '/',
      routes: {
        '/': (context) =>
            LoginScreen(), // Установите экран регистрации как начальный маршрут
        '/home': (context) =>
            MainScreen(), // Используйте MainScreen вместо HomeScreen
        '/listOfAuthors': (context) => AuthorListScreen(),
        '/listOfCharacters': (context) => CharacterListScreen(),
        '/listOfNews': (context) => const NewsListScreen(),
        '/listOfEvents': (context) => CalendarScreen(),
      },
    );
  }
}
