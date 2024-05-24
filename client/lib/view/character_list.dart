import 'package:flutter/material.dart';
import '../controller/character_controller.dart';
import '../model/character.dart';
import '../services/api_service.dart';
import '../view/kuroko_drawer.dart';
import 'character_detail_screen.dart';

class CharacterListScreen extends StatelessWidget {
  CharacterListScreen({Key? key});

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<List<Character>>(
      future: fetchCharacters(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return Scaffold(
            appBar: AppBar(
              title: const Text('Basketball Kuroko characters'),
              backgroundColor: const Color(0xFFffd166),
            ),
            drawer: const KurokoDrawer(),
            body: Center(
              child: CircularProgressIndicator(),
            ),
          );
        } else if (snapshot.hasError) {
          return Scaffold(
            appBar: AppBar(
              title: const Text('Basketball Kuroko characters'),
              backgroundColor: const Color(0xFFffd166),
            ),
            drawer: const KurokoDrawer(),
            body: Center(
              child: Text('Error: ${snapshot.error}'),
            ),
          );
        } else {
          List<Character> characterList = snapshot.data ?? [];
          return Scaffold(
            appBar: AppBar(
              title: const Text('Basketball Kuroko characters'),
              backgroundColor: const Color(0xFFffd166),
            ),
            drawer: const KurokoDrawer(),
            body: GridView.builder(
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2,
                childAspectRatio: 0.75,
              ),
              itemCount: characterList.length,
              itemBuilder: (context, index) {
                Character character = characterList[index];
                return Card(
                  elevation: 4,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      SizedBox(
                        height: 156,
                        child: Container(
                          margin: const EdgeInsets.all(8.0),
                          child: ClipRRect(
                            borderRadius: const BorderRadius.only(
                              topLeft: Radius.circular(4.0),
                              topRight: Radius.circular(4.0),
                            ),
                            child: Image.asset(
                              character.imageUrl,
                              fit: BoxFit.cover,
                            ),
                          ),
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              character.name,
                              style: const TextStyle(
                                fontWeight: FontWeight.bold,
                                fontSize: 16,
                              ),
                            ),
                          ],
                        ),
                      ),
                      ElevatedButton(
                        onPressed: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) =>
                                  CharacterDetailsScreen(character: character),
                            ),
                          );
                        },
                        style: ButtonStyle(
                          backgroundColor: MaterialStateProperty.all<Color>(
                            const Color.fromARGB(255, 18, 43, 64),
                          ),
                          overlayColor: MaterialStateProperty.all<Color>(
                            const Color.fromARGB(255, 22, 52, 76),
                          ),
                          foregroundColor:
                              MaterialStateProperty.all<Color>(Colors.white),
                          textStyle: MaterialStateProperty.all<TextStyle>(
                            const TextStyle(fontSize: 15),
                          ),
                        ),
                        child: const Text('Details'),
                      ),
                    ],
                  ),
                );
              },
            ),
          );
        }
      },
    );
  }
}
