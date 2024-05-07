import 'package:flutter/material.dart';
import '../controller/character_controller.dart';
import '../model/character.dart';
import '../view/kuroko_drawer.dart';
import 'character_detail_screen.dart';

class CharacterListScreen extends StatelessWidget {
  final CharacterController _characterController = CharacterController();

  CharacterListScreen({super.key});

  @override
  Widget build(BuildContext context) {
    List<Character> characterList = _characterController.getCharacterList();

    return Scaffold(
      appBar: AppBar(
        title: const Text('Basketball Kuroko characters'),
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
                        const Color.fromARGB(255, 18, 43, 64)),
                    overlayColor: MaterialStateProperty.all<Color>(
                        const Color.fromARGB(255, 22, 52, 76)),
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
}
