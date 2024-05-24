import 'package:flutter/material.dart';
import '../controller/feature_controller.dart';
import '../controller/character_controller.dart';
import '../controller/news_controller.dart';
import '../model/character.dart';
import '../model/news.dart';
import '../view/kuroko_drawer.dart';
import 'package:youtube_player_flutter/youtube_player_flutter.dart';

class MainScreen extends StatelessWidget {
  final FeatureController _featureController = FeatureController();
  final CharacterController _characterController = CharacterController();
  final NewsController _newsController = NewsController();

  MainScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: PreferredSize(
        preferredSize: Size.fromHeight(60.0),
        child: Column(
          children: [
            AppBar(
              title: const Text('Basketball Kuroko', style: TextStyle(fontFamily: 'Blankeny', fontSize: 30),),
              backgroundColor: const Color(0xFFffd166),
            ),
          ],
        ),
      ),
      drawer: const KurokoDrawer(),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            _buildSectionTitle('Trailer'),
            _buildVideoSection(),
            const SizedBox(height: 2),
            _buildSectionTitle('Main characters'),
            _buildFeaturedCharacterSection(),
            const SizedBox(height: 20),
            _buildSectionTitle('News'),
            _buildLatestNewsSection(context),
            const SizedBox(height: 20),

          ],
        ),
      ),
    );
  }

  Widget _buildSectionTitle(String title) {
    return Container(
      decoration: const BoxDecoration(
        borderRadius: const BorderRadius.vertical(top: Radius.circular(10.0)),
        color: Color(0xFF94B6EF),
      ),
      padding: const EdgeInsets.all(12),
      child: Center(
        child: Text(
          title,
          style: const TextStyle(
            fontSize: 24,
            fontWeight: FontWeight.bold,
            color: Color(0xFF213E60),
          ),
        ),
      ),
    );
  }

  Widget _buildFeaturedCharacterSection() {
    Character featuredCharacter = _characterController.getFeaturedCharacter();

    return Container(
      decoration: BoxDecoration(
        borderRadius: const BorderRadius.vertical(bottom: Radius.circular(10.0)),
        color: const Color(0xFFE68C3A),
      ),
      padding: const EdgeInsets.all(12),
      child: Column(
        children: [
          Image.asset(
            featuredCharacter.imageUrl,
            height: 200,
            width: 200,
            fit: BoxFit.cover,
          ),
          const SizedBox(height: 14),
          Text(
            featuredCharacter.name,
            style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 8),
          Text(
            featuredCharacter.description,
            textAlign: TextAlign.center,
            style: const TextStyle(fontSize: 16),
          ),
        ],
      ),
    );
  }

  Widget _buildLatestNewsSection(BuildContext context) {
    List<News> newsList = _newsController.getNewsList();

    return Column(
      children: newsList.map((news) {
        return GestureDetector(
          onTap: () {
            Navigator.pushReplacementNamed(context, '/listOfNews');
          },
          child: Card(
            margin: const EdgeInsets.symmetric(vertical: 8, horizontal: 12),
            elevation: 4,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(10), // Add border radius to news cards
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Image.asset(
                  news.photoUrl,
                  height: 150,
                  fit: BoxFit.cover,
                ),
                Padding(
                  padding: const EdgeInsets.all(8),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        news.title,
                        style: const TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const SizedBox(height: 8),
                      Text(
                        news.mainText,
                        style: const TextStyle(fontSize: 16),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        );
      }).toList(),
    );
  }


  Widget _buildVideoSection() {
    YoutubePlayerController _controller = YoutubePlayerController(
      initialVideoId: '1KLvA6FMNiE',
      flags: const YoutubePlayerFlags(
        autoPlay: false,
        mute: false,
      ),
    );

    return Container(
      decoration: BoxDecoration(
        border: Border.all(color: Colors.black, width: 1),
      ),
      margin: const EdgeInsets.all(8),
      child: Center(
        child: YoutubePlayer(
          controller: _controller,
          showVideoProgressIndicator: true,
        ),
      ),
    );
  }
}
