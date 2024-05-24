import 'package:flutter/material.dart';
import '../controller/news_controller.dart';
import '../model/news.dart';
import '../model/comment.dart';
import '../view/kuroko_drawer.dart';

class NewsListScreen extends StatefulWidget {
  const NewsListScreen({super.key});

  @override
  // ignore: library_private_types_in_public_api
  _NewsListScreenState createState() => _NewsListScreenState();
}

class _NewsListScreenState extends State<NewsListScreen> {
  final NewsController _newsController = NewsController();
  final Map<String, List<Comment>> commentsMap = {};
  final Map<String, TextEditingController> commentControllersMap = {};
  final Map<String, bool> showAllCommentsMap = {};

  @override
  Widget build(BuildContext context) {
    List<News> newsList = _newsController.getNewsList();

    return Scaffold(
      appBar: AppBar(
        title: const Text('kuroko news'),
        backgroundColor: const Color(0xFFffd166),
      ),
      drawer: const KurokoDrawer(),
      body: ListView.builder(
        itemCount: newsList.length,
        itemBuilder: (context, index) {
          News news = newsList[index];
          if (!commentControllersMap.containsKey(news.title)) {
            commentControllersMap[news.title] = TextEditingController();
          }
          TextEditingController commentController =
              commentControllersMap[news.title]!;

          bool showAllComments = showAllCommentsMap[news.title] ?? false;
          List<Comment> comments = commentsMap[news.title] ?? [];
          List<Comment> displayedComments =
              showAllComments ? comments : comments.take(2).toList();

          return Card(
            elevation: 4,
            margin: const EdgeInsets.all(12),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Image.asset(news.photoUrl, fit: BoxFit.cover),
                Padding(
                  padding: const EdgeInsets.all(12.0),
                  child: Text(
                    news.title,
                    style: const TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 12.0),
                  child: Text(
                    news.mainText,
                    style: const TextStyle(fontSize: 18),
                  ),
                ),
                const SizedBox(height: 12.0),
                const Padding(
                  padding: EdgeInsets.all(12.0),
                  child: Text(
                    'comments:',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                Column(
                  children: displayedComments.map((comment) {
                    return ListTile(
                      title: Text(comment.text),
                      subtitle: Text('by: ${comment.username}'),
                    );
                  }).toList(),
                ),
                if (comments.length > 2)
                  TextButton(
                    onPressed: () {
                      setState(() {
                        showAllCommentsMap[news.title] = !showAllComments;
                      });
                    },
                    child: Text(
                      showAllComments ? 'show less' : 'Show more',
                      style: const TextStyle(
                        color: Colors.blue,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                Padding(
                  padding: const EdgeInsets.all(12.0),
                  child: TextField(
                    controller: commentController,
                    onSubmitted: (value) {
                      if (value.isNotEmpty) {
                        setState(() {
                          commentsMap
                              .putIfAbsent(news.title, () => [])
                              .add(Comment(value));
                          commentController.clear();
                        });
                      }
                    },
                    decoration: InputDecoration(
                      hintText: 'Add a comment.',
                      suffixIcon: IconButton(
                        icon: const Icon(Icons.send),
                        onPressed: () {
                          String commentText = commentController.text.trim();
                          if (commentText.isNotEmpty) {
                            setState(() {
                              commentsMap
                                  .putIfAbsent(news.title, () => [])
                                  .add(Comment(commentText));
                              commentController.clear();
                            });
                          }
                        },
                      ),
                    ),
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }

  @override
  void dispose() {
    for (var controller in commentControllersMap.values) {
      controller.dispose();
    }
    super.dispose();
  }
}
