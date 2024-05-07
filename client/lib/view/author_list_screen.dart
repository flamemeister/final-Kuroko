import 'package:flutter/material.dart';
import '../controller/authors_controller.dart';
import '../model/authors.dart';
import '../view/kuroko_drawer.dart';
import 'authors_detail_screen.dart';

class AuthorListScreen extends StatelessWidget {
  final AuthorController _authorController = AuthorController();

  AuthorListScreen({super.key});

  @override
  Widget build(BuildContext context) {
    List<Authors> authorList = _authorController.getAuthorList();

    return Scaffold(
      appBar: AppBar(
        title: const Text('here are the authors'),
      ),
      drawer: const KurokoDrawer(),
      body: GridView.builder(
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,
          childAspectRatio: 0.75,
        ),
        itemCount: authorList.length,
        itemBuilder: (context, index) {
          Authors authors = authorList[index];
          return Card(
            elevation: 4,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                SizedBox(
                  height: 161,
                  child: Container(
                    margin: const EdgeInsets.all(8.0),
                    child: ClipRRect(
                      borderRadius: const BorderRadius.only(
                        topLeft: Radius.circular(4.0),
                        topRight: Radius.circular(4.0),
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
                        authors.name,
                        style: const TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 18,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        authors.role,
                        style: const TextStyle(fontSize: 16),
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
                            AuthorDetailsScreen(authors: authors),
                      ),
                    );
                  },
                  style: ButtonStyle(
                    backgroundColor:
                        MaterialStateProperty.all<Color>(Colors.blue),
                    overlayColor:
                        MaterialStateProperty.all<Color>(Colors.blue.shade500),
                    foregroundColor:
                        MaterialStateProperty.all<Color>(Colors.white),
                    textStyle: MaterialStateProperty.all<TextStyle>(
                      const TextStyle(fontSize: 15),
                    ),
                  ),
                  child: const Text('see more ->'),
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}
