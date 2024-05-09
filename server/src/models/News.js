/**
 * @file This file defines the News class.
 * @description This class represents a news article with a title, photo URL, and main text.
 */

/**
 * Represents a news article.
 * @class
 */
 class News {
  /**
   * Create a news article.
   * @param {string} title - The title of the news article.
   * @param {string} photoUrl - The URL of the photo associated with the news article.
   * @param {string} mainText - The main text content of the news article.
   */
  constructor(title, photoUrl, mainText) {
    this.title = title;
    this.photoUrl = photoUrl;
    this.mainText = mainText;
  }
}

module.exports = News;
