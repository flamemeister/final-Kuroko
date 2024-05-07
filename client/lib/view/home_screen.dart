import 'package:flutter/material.dart';
import '../controller/feature_controller.dart';
import '../controller/character_controller.dart';
import '../controller/news_controller.dart';
import '../model/feature.dart';
import '../model/character.dart';
import '../model/news.dart';
import '../view/kuroko_drawer.dart';

class MainScreen extends StatelessWidget {
  final FeatureController _featureController = FeatureController();
  final CharacterController _characterController = CharacterController();
  final NewsController _newsController = NewsController();

  MainScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Basketball Kuroko'),
        backgroundColor: const Color.fromARGB(255, 255, 255, 255),
      ),
      drawer: const KurokoDrawer(),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            _buildSectionTitle('Features of project'),
            _buildFeaturesSection(),
            const SizedBox(height: 20),
            _buildSectionTitle('Main characters'),
            _buildFeaturedCharacterSection(),
            const SizedBox(height: 20),
            _buildSectionTitle('News'),
            _buildLatestNewsSection(),
            const SizedBox(height: 20),
          ],
        ),
      ),
    );
  }

  Widget _buildSectionTitle(String title) {
    return Container(
      decoration: BoxDecoration(
        border: Border.all(color: Colors.black, width: 1),
        borderRadius: BorderRadius.circular(10),
        color: Colors.cyanAccent,
      ),
      padding: const EdgeInsets.all(12),
      child: Center(
      child: Text(
        title,
        style: const TextStyle(
          fontSize: 24,
          fontWeight: FontWeight.bold,
          color: Colors.indigoAccent,
        ),
      ),
    ),
    );
  }

  Widget _buildFeaturesSection() {
    List<Feature> features = _featureController.getFeaturesList();

    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: Row(
        children: features.map((feature) {
          return Container(
            decoration: BoxDecoration(
              border: Border.all(color: Colors.black, width: 1),
              borderRadius: BorderRadius.circular(10),
            ),
            margin: const EdgeInsets.all(8),
            child: Column(
              children: [
                Image.asset(
                  feature.imageUrl,
                  height: 100,
                  width: 300,
                  fit: BoxFit.fitWidth,
                ),
                const SizedBox(height: 8),

                 Text(
                  feature.name,
                  style: const TextStyle(fontSize: 16),
                ),
              ],
            ),
          );
        }).toList(),
      ),
    );
  }

  Widget _buildFeaturedCharacterSection() {
    Character featuredCharacter = _characterController.getFeaturedCharacter();

    return Container(
      decoration: BoxDecoration(
        border: Border.all(color: Colors.black, width: 2),
        borderRadius: BorderRadius.circular(10),
        color: const Color.fromARGB(255, 58, 98, 132),
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

  Widget _buildLatestNewsSection() {
    List<News> newsList = _newsController.getNewsList();

    return Column(
      children: newsList.map((news) {
        return Card(
          margin: const EdgeInsets.symmetric(vertical: 8, horizontal: 12),
          elevation: 4,
          shape: RoundedRectangleBorder(
            borderRadius:
                BorderRadius.circular(10), // Add border radius to news cards
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
        );
      }).toList(),
    );
  }
}
