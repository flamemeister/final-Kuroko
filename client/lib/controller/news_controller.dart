import '../model/news.dart';

class NewsController {
  List<News> getNewsList() {
    return [
      News(
        'New season is coming!',
        'assets/news/news_season.jpeg',
        'Dont miss it in 2059!',
      ),
    ];
  }
}
