import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import ProtectedRoute from '../../components/ProtectedRoute';

const bookChapters = {
  genesis: {
    title: 'Genesis',
    chapters: [
      { number: 1, verses: [
        "In the beginning God created the heavens and the earth.",
        "Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters.",
        "And God said, 'Let there be light,' and there was light.",
        "God saw that the light was good, and he separated the light from the darkness.",
        "God called the light 'day,' and the darkness he called 'night.' And there was evening, and there was morning—the first day.",
        "And God said, 'Let there be a vault between the waters to separate water from water.'",
        "So God made the vault and separated the water under the vault from the water above it. And it was so.",
        "God called the vault 'sky.' And there was evening, and there was morning—the second day."
      ]},
      { number: 2, verses: [
        "Thus the heavens and the earth were completed in all their vast array.",
        "By the seventh day God had finished the work he had been doing; so on the seventh day he rested from all his work.",
        "Then God blessed the seventh day and made it holy, because on it he rested from all the work of creating that he had done.",
        "This is the account of the heavens and the earth when they were created, when the Lord God made the earth and the heavens.",
        "Now no shrub had yet appeared on the earth and no plant had yet sprung up, for the Lord God had not sent rain on the earth and there was no one to work the ground,",
        "but streams came up from the earth and watered the whole surface of the ground."
      ]},
      { number: 3, verses: [
        "Now the serpent was more crafty than any of the wild animals the Lord God had made. He said to the woman, 'Did God really say, 'You must not eat from any tree in the garden?''",
        "The woman said to the serpent, 'We may eat fruit from the trees in the garden,",
        "but God did say, 'You must not eat fruit from the tree that is in the middle of the garden, and you must not touch it, or you will die.''",
        "You will not certainly die,' the serpent said to the woman.",
        "'For God knows that when you eat from it your eyes will be opened, and you will be like God, knowing good and evil.'"
      ]},
      { number: 4, verses: [
        "Adam made love to his wife Eve, and she became pregnant and gave birth to Cain. She said, 'With the help of the Lord I have brought forth a man.'",
        "Later she gave birth to his brother Abel. Now Abel kept flocks, and Cain worked the soil.",
        "In the course of time Cain brought some of the fruits of the soil as an offering to the Lord.",
        "And Abel also brought an offering—fat portions from some of the firstborn of his flock. The Lord looked with favor on Abel and his offering,",
        "but on Cain and his offering he did not look with favor. So Cain was very angry, and his face was downcast."
      ]},
    ],
  },
  exodus: {
    title: 'Exodus',
    chapters: [
      { number: 1, verses: [
        "These are the names of the sons of Israel who went to Egypt with Jacob, each with his family:",
        "Reuben, Simeon, Levi and Judah;",
        "Issachar, Zebulun and Benjamin;",
        "Dan and Naphtali; Gad and Asher.",
        "The descendants of Jacob numbered seventy in all; Joseph was already in Egypt."
      ]},
      { number: 20, verses: [
        "And God spoke all these words: 'I am the Lord your God, who brought you out of Egypt, out of the land of slavery.'",
        "'You shall have no other gods before me.'",
        "'You shall not make for yourself an image in the form of anything in heaven above or on the earth beneath or in the waters below.'",
        "'You shall not bow down to them or worship them; for I, the Lord your God, am a jealous God, punishing the children for the sin of the parents to the third and fourth generation of those who hate me,'",
        "'but showing love to a thousand generations of those who love me and keep my commandments.'"
      ]},
    ],
  },
  psalms: {
    title: 'Psalms',
    chapters: [
      { number: 23, verses: [
        "The Lord is my shepherd, I lack nothing.",
        "He makes me lie down in green pastures, he leads me beside quiet waters,",
        "he refreshes my soul. He guides me along the right paths for his name’s sake.",
        "Even though I walk through the darkest valley, I will fear no evil, for you are with me; your rod and your staff, they comfort me.",
        "You prepare a table before me in the presence of my enemies. You anoint my head with oil; my cup overflows.",
        "Surely your goodness and love will follow me all the days of my life, and I will dwell in the house of the Lord forever."
      ]},
      { number: 1, verses: [
        "Blessed is the one who does not walk in step with the wicked or stand in the way that sinners take or sit in the company of mockers,",
        "but whose delight is in the law of the Lord, and who meditates on his law day and night.",
        "That person is like a tree planted by streams of water, which yields its fruit in season and whose leaf does not wither—whatever they do prospers.",
        "Not so the wicked! They are like chaff that the wind blows away.",
        "Therefore the wicked will not stand in the judgment, nor sinners in the assembly of the righteous."
      ]},
    ],
  },
  proverbs: {
    title: 'Proverbs',
    chapters: [
      { number: 1, verses: [
        "The proverbs of Solomon son of David, king of Israel:",
        "for gaining wisdom and instruction; for understanding words of insight;",
        "for receiving instruction in prudent behavior, doing what is right and just and fair;",
        "for giving prudence to those who are simple, knowledge and discretion to the young—",
        "let the wise listen and add to their learning, and let the discerning get guidance—"
      ]},
      { number: 3, verses: [
        "My son, do not forget my teaching, but keep my commands in your heart,",
        "for they will prolong your life many years and bring you peace and prosperity.",
        "Let love and faithfulness never leave you; bind them around your neck, write them on the tablet of your heart.",
        "Then you will win favor and a good name in the sight of God and man.",
        "Trust in the Lord with all your heart and lean not on your own understanding;"
      ]},
    ],
  },
  matthew: {
    title: 'Matthew',
    chapters: [
      { number: 5, verses: [
        "Now when Jesus saw the crowds, he went up on a mountainside and sat down. His disciples came to him,",
        "and he began to teach them. He said: 'Blessed are the poor in spirit, for theirs is the kingdom of heaven.'",
        "Blessed are those who mourn, for they will be comforted.",
        "Blessed are the meek, for they will inherit the earth.",
        "Blessed are those who hunger and thirst for righteousness, for they will be filled."
      ]},
      { number: 6, verses: [
        "'Be careful not to practice your righteousness in front of others to be seen by them. If you do, you will have no reward from your Father in heaven.'",
        "'So when you give to the needy, do not announce it with trumpets, as the hypocrites do in the synagogues and on the streets, to be honored by others. Truly I tell you, they have received their reward in full.'",
        "'But when you give to the needy, do not let your left hand know what your right hand is doing,'",
        "'so that your giving may be in secret. Then your Father, who sees what is done in secret, will reward you.'"
      ]},
    ],
  },
  john: {
    title: 'John',
    chapters: [
      { number: 1, verses: [
        "In the beginning was the Word, and the Word was with God, and the Word was God.",
        "He was with God in the beginning. Through him all things were made; without him nothing was made that has been made.",
        "In him was life, and that life was the light of all mankind.",
        "The light shines in the darkness, and the darkness has not overcome it.",
        "There was a man sent from God whose name was John."
      ]},
      { number: 3, verses: [
        "Now there was a Pharisee, a man named Nicodemus who was a member of the Jewish ruling council.",
        "He came to Jesus at night and said, 'Rabbi, we know that you are a teacher who has come from God. For no one could perform the signs you are doing if God were not with him.'",
        "Jesus replied, 'Very truly I tell you, no one can see the kingdom of God unless they are born again.'",
        "'How can someone be born when they are old?' Nicodemus asked. 'Surely they cannot enter a second time into their mother’s womb to be born!'",
        "Jesus answered, 'Very truly I tell you, no one can enter the kingdom of God unless they are born of water and the Spirit.'"
      ]},
    ],
  },
  romans: {
    title: 'Romans',
    chapters: [
      { number: 8, verses: [
        "Therefore, there is now no condemnation for those who are in Christ Jesus,",
        "because through Christ Jesus the law of the Spirit who gives life has set you free from the law of sin and death.",
        "For what the law was powerless to do because it was weakened by the flesh, God did by sending his own Son in the likeness of sinful flesh to be a sin offering. And so he condemned sin in the flesh,",
        "in order that the righteous requirement of the law might be fully met in us, who do not live according to the flesh but according to the Spirit.",
        "Those who live according to the flesh have their minds set on what the flesh desires; but those who live in accordance with the Spirit have their minds set on what the Spirit desires."
      ]},
      { number: 12, verses: [
        "Therefore, I urge you, brothers and sisters, in view of God’s mercy, to offer your bodies as a living sacrifice, holy and pleasing to God—this is your true and proper worship.",
        "Do not conform to the pattern of this world, but be transformed by the renewing of your mind. Then you will be able to test and approve what God’s will is—his good, pleasing and perfect will.",
        "For by the grace given me I say to every one of you: Do not think of yourself more highly than you ought, but rather think of yourself with sober judgment, in accordance with the faith God has distributed to each of you.",
        "For just as each of us has one body with many members, and these members do not all have the same function,",
        "so in Christ we, though many, form one body, and each member belongs to all the others."
      ]},
    ],
  },
  revelation: {
    title: 'Revelation',
    chapters: [
      { number: 21, verses: [
        "Then I saw 'a new heaven and a new earth,' for the first heaven and the first earth had passed away, and there was no longer any sea.",
        "I saw the Holy City, the new Jerusalem, coming down out of heaven from God, prepared as a bride beautifully dressed for her husband.",
        "And I heard a loud voice from the throne saying, 'Look! God’s dwelling place is now among the people, and he will dwell with them. They will be his people, and God himself will be with them and be their God.'",
        "'He will wipe every tear from their eyes. There will be no more death or mourning or crying or pain, for the old order of things has passed away.'",
        "He who was seated on the throne said, 'I am making everything new!' Then he said, 'Write this down, for these words are trustworthy and true.'"
      ]},
      { number: 22, verses: [
        "Then the angel showed me the river of the water of life, as clear as crystal, flowing from the throne of God and of the Lamb",
        "down the middle of the great street of the city. On each side of the river stood the tree of life, bearing twelve crops of fruit, yielding its fruit every month. And the leaves of the tree are for the healing of the nations.",
        "No longer will there be any curse. The throne of God and of the Lamb will be in the city, and his servants will serve him.",
        "They will see his face, and his name will be on their foreheads.",
        "There will be no more night. They will not need the light of a lamp or the light of the sun, for the Lord God will give them light. And they will reign for ever and ever."
      ]},
    ],
  },
};

function getBookData(bookId) {
  const book = bookChapters[bookId] || { title: bookId.replace(/-/g, ' ').toUpperCase(), chapters: [{ number: 1, verses: ["Select a chapter to read verses from this book.", "This is a placeholder for Bible verses."] }] };
  return book;
}

function BookDetailsContent() {
  const router = useRouter();
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  const [selectedChapter, setSelectedChapter] = useState(1);
  const book = getBookData(id);
  const chapter = book.chapters.find(c => c.number === selectedChapter) || book.chapters[0];

  const handleHighlight = (verseIndex) => {
    Alert.alert('Highlight', `Verse ${verseIndex + 1} highlighted for study!`);
    // In a full app, save to local storage or Firebase
  };

  return (
    <ProtectedRoute>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.bookTitle}>{book.title}</Text>
          <Text style={styles.subtitle}>Select a chapter to begin your study</Text>
        </View>

        <View style={styles.chaptersSection}>
          <Text style={styles.sectionTitle}>Chapters ({book.chapters.length})</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chaptersList}>
            {book.chapters.map((ch) => (
              <TouchableOpacity
                key={ch.number}
                style={[styles.chapterButton, selectedChapter === ch.number && styles.selectedChapter]}
                onPress={() => setSelectedChapter(ch.number)}
              >
                <Text style={[styles.chapterText, selectedChapter === ch.number && styles.selectedChapterText]}>Chapter {ch.number}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.versesSection}>
          <Text style={styles.sectionTitle}>Chapter {selectedChapter} Verses</Text>
          <View style={styles.versesContainer}>
            {chapter.verses.map((verse, index) => (
              <View key={index} style={styles.verseItem}>
                <Text style={styles.verseNumber}>{index + 1}</Text>
                <Text style={styles.verseText}>{verse}</Text>
                <TouchableOpacity onPress={() => handleHighlight(index)} style={styles.highlightButton}>
                  <Ionicons name="bookmark" size={16} color="#4B0069" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.backButtonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Back to Books</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ProtectedRoute>
  );
}

export default function BookDetails() {
  return <BookDetailsContent />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F3FF',
  },
  header: {
    backgroundColor: '#4B0069',
    padding: 20,
    alignItems: 'center',
  },
  bookTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
  },
  chaptersSection: {
    padding: 20,
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4B0069',
    marginBottom: 10,
  },
  chaptersList: {
    paddingVertical: 10,
  },
  chapterButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  selectedChapter: {
    backgroundColor: '#4B0069',
  },
  chapterText: {
    color: '#333',
    fontWeight: '600',
  },
  selectedChapterText: {
    color: '#fff',
  },
  versesSection: {
    flex: 1,
    padding: 20,
  },
  versesContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  verseItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  verseNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4B0069',
    marginRight: 10,
    minWidth: 20,
  },
  verseText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  highlightButton: {
    padding: 5,
    marginLeft: 10,
  },
  backButtonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: '#4B0069',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 150,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
