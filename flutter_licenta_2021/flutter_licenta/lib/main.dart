import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:english_words/english_words.dart';
import 'screens/bluetoothScreen.dart';
import 'screens/nfcScreen.dart';
import 'routes/routes.dart';
import 'routes/drawerNavigation.dart';
import 'screens/overview.dart';
import 'screens/gpsScreen.dart';
import 'screens/gyroscopeScreen.dart';
import 'screens/cameraScreen.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:provider/provider.dart';
import 'login/authentication.dart';
import 'dart:developer' as developer;
import 'notifiers/functionalityState.dart';

void main() => runApp(ChangeNotifierProvider(
    create: (_) =>
        FuncState(nfc: false, gps: false, gyroscope: false, bluetooth: false),
    child: MyApp()));

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
        // Initialize FlutterFire
        future: Firebase.initializeApp(),
        builder: (context, snapshot) {
          // Check for errors
          if (snapshot.hasError) {
            developer.log('log me', name: 'my.app.category');
            print(snapshot);
          }

          // Once complete, show your application
          if (snapshot.connectionState == ConnectionState.done) {
            return MaterialApp(
                title: 'Welcome to Flutter',
                home: CameraScreen(),
                routes: {
                  pageRoutes.nfc: (context) => NFCScreen(),
                  pageRoutes.bluetooth: (context) => BluetoothScreen(),
                  pageRoutes.overview: (context) => Overview(),
                  pageRoutes.gyroscope: (context) => GyroscopeScreen(),
                  pageRoutes.gps: (context) => GPSScreen(),
                  pageRoutes.camera: (context) => CameraScreen(),
                  pageRoutes.login: (context) => LoginPage()
                });
          }
          return CircularProgressIndicator();
        });
  }
}

class RandomWords extends StatefulWidget {
  const RandomWords({Key? key}) : super(key: key);

  @override
  _RandomWordsState createState() => _RandomWordsState();
}

class _RandomWordsState extends State<RandomWords> {
  @override
  Widget build(BuildContext context) {
    final wordPair = WordPair.random();
    return Text(wordPair.asPascalCase);
  }
}
