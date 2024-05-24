import 'package:flutter/material.dart';
import 'package:basketball_kuroko_wiki/view/home_screen.dart';
import 'package:basketball_kuroko_wiki/view/author_list_screen.dart';
import 'package:basketball_kuroko_wiki/view/character_list.dart';
import 'package:basketball_kuroko_wiki/view/news_list_screen.dart';
import 'package:basketball_kuroko_wiki/view/calendar_screen.dart';
import 'package:basketball_kuroko_wiki/view/register_screen.dart';
import 'package:basketball_kuroko_wiki/view/login_screen.dart';

void main() => runApp(const KurokoLegacy());

class KurokoLegacy extends StatelessWidget {
  const KurokoLegacy({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Basketball Kuroko Wiki',
      theme: ThemeData(
        visualDensity: VisualDensity.adaptivePlatformDensity,
        colorScheme: ColorScheme.fromSwatch(primarySwatch: Colors.deepOrange)
            .copyWith(
          background: const Color(0xFFedede9),
        ),
      ),
      initialRoute: '/login',
      routes: {
        '/login': (context) => LoginScreen(),
        '/register': (context) => RegisterScreen(),
        '/home': (context) => MainScreen(),
        '/listOfAuthors': (context) => AuthorListScreen(),
        '/listOfCharacters': (context) => CharacterListScreen(),
        '/listOfNews': (context) => const NewsListScreen(),
        '/listOfEvents': (context) => CalendarScreen(),
      },
    );
  }
}
