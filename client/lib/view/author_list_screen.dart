import 'package:flutter/material.dart';
import '../model/authors.dart';
import '../view/kuroko_drawer.dart';
import 'authors_detail_screen.dart';
import '../services/api_service.dart';

class AuthorListScreen extends StatefulWidget {
  @override
  _AuthorListScreenState createState() => _AuthorListScreenState();
}

class _AuthorListScreenState extends State<AuthorListScreen> {
  late List<Authors> authorList;

  @override
  void initState() {
    super.initState();
    // Вызываем fetchAuthors для получения данных и сохраняем их в authorList
    fetchAuthors().then((authors) {
      setState(() {
        authorList = authors;
      });
    }).catchError((error) {
      // Обрабатываем ошибку, если произошла
      print('Error fetching authors: $error');
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('here are the authors'),
      ),
      drawer: const KurokoDrawer(),
      body: authorList == null
          ? Center(child: CircularProgressIndicator()) // Ожидаем пока данные загружаются
          : GridView.builder(
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
