import 'package:flutter/material.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import '../controller/news_controller.dart';
import '../model/news.dart';
import '../model/comment.dart';
import '../view/kuroko_drawer.dart';
import '../services/api_service.dart';

class NewsListScreen extends StatefulWidget {
  const NewsListScreen({super.key});

  @override
  _NewsListScreenState createState() => _NewsListScreenState();
}

class _NewsListScreenState extends State<NewsListScreen> {
  final NewsController _newsController = NewsController();
  final Map<String, List<Comment>> commentsMap = {};
  final Map<String, TextEditingController> commentControllersMap = {};
  final Map<String, bool> showAllCommentsMap = {};
  final Map<String, double> currentRatingsMap = {};
  final Map<String, Map<String, double>> ratingsMap = {};
  List<News> newsList = []; // Добавим переменную для хранения списка новостей

  @override
  void initState() {
    super.initState();
    _fetchNews();
  }

  Future<void> _fetchNews() async {
    try {
      List<News> fetchedNews = await fetchLocalNews();
      setState(() {
        newsList = fetchedNews; // Обновляем список новостей в состоянии виджета
      });
    } catch (error) {
      print('Error fetching news: $error');
    }
  }

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
                      subtitle: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('by: ${comment.username}'),
                          if (ratingsMap[news.title]?[comment.text] != null)
                            RatingBarIndicator(
                              rating: ratingsMap[news.title]![comment.text]!,
                              itemBuilder: (context, index) => const Icon(
                                Icons.star,
                                color: Colors.amber,
                              ),
                              itemCount: 5,
                              itemSize: 20.0,
                              direction: Axis.horizontal,
                            ),
                        ],
                      ),
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
                      showAllComments ? 'Show less' : 'Show more',
                      style: const TextStyle(
                        color: Colors.blue,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                Padding(
                  padding: const EdgeInsets.all(12.0),
                  child: Column(
                    children: [
                      TextField(
                        controller: commentController,
                        onSubmitted: (value) {
                          if (value.isNotEmpty) {
                            _addComment(news.title, value);
                          }
                        },
                        decoration: InputDecoration(
                          hintText: 'Add a comment.',
                          suffixIcon: IconButton(
                            icon: const Icon(Icons.send),
                            onPressed: () {
                              String commentText =
                                  commentController.text.trim();
                              if (commentText.isNotEmpty) {
                                _addComment(news.title, commentText);
                              }
                            },
                          ),
                        ),
                      ),
                      RatingBar.builder(
                        initialRating: 0,
                        minRating: 1,
                        direction: Axis.horizontal,
                        allowHalfRating: true,
                        itemCount: 5,
                        itemPadding:
                            const EdgeInsets.symmetric(horizontal: 4.0),
                        itemBuilder: (context, _) => const Icon(
                          Icons.star,
                          color: Colors.amber,
                        ),
                        onRatingUpdate: (rating) {
                          setState(() {
                            currentRatingsMap[news.title] = rating;
                          });
                        },
                      ),
                    ],
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }

  void _addComment(String newsTitle, String commentText) {
    setState(() {
      commentsMap.putIfAbsent(newsTitle, () => []).add(Comment(commentText));
      double rating = currentRatingsMap[newsTitle] ?? 0.0;
      if (!ratingsMap.containsKey(newsTitle)) {
        ratingsMap[newsTitle] = {};
      }
      ratingsMap[newsTitle]![commentText] = rating;
      commentControllersMap[newsTitle]!.clear();
      currentRatingsMap[newsTitle] = 0.0;
    });
  }

  @override
  void dispose() {
    for (var controller in commentControllersMap.values) {
      controller.dispose();
    }
    super.dispose();
  }
}
