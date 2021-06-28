import 'dart:io';

import 'package:flutter/material.dart';
import '../routes/drawerNavigation.dart';
import 'package:flutter_licenta/routes/routes.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:camera/camera.dart';
import 'package:flutter_licenta/screens/controllers/cameraCtrl.dart';
import 'package:camera/camera.dart';
import './controllers/galleryCtrl.dart';
import 'package:path_provider/path_provider.dart';
import '../design/colors.dart';

class CameraScreen extends StatelessWidget {
  static const String routeName = '/camera';
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          backgroundColor: appBarColor,
          title: Text('Camera'),
          actions: <Widget>[
            IconButton(
                onPressed: () {
                  FirebaseAuth.instance.signOut();
                  Navigator.pushReplacementNamed(context, pageRoutes.login);
                },
                icon: Icon(Icons.exit_to_app_outlined, color: Colors.white))
          ],
        ),
        body: CameraOptions(),
        drawer: DrawerNavigation());
  }
}

class CameraOptions extends StatefulWidget {
  const CameraOptions({Key? key}) : super(key: key);

  @override
  _CameraOptionsState createState() => _CameraOptionsState();
}

class _CameraOptionsState extends State<CameraOptions> {
  late final cameras;
  late var list;

  Future<void> initCameras() async {
    cameras = await availableCameras();
    print(cameras);
  }

  void getImages() async {
    final dir = await getApplicationDocumentsDirectory();
    final directory =
        await Directory(dir.path + '/gallery').create(recursive: true);
    print(directory.path);

    setState(() {
      list = Directory(dir.path + '/gallery').listSync();
    });
  }

  void galleryButton() async {
    getImages();
    Navigator.push(context,
        MaterialPageRoute(builder: (context) => GalleryCtrl(list: list)));
  }

  @override
  void initState() {
    super.initState();
    initCameras();
    getImages();
  }

  @override
  Widget build(BuildContext context) {
    return Center(
        child: Column(
      mainAxisAlignment: MainAxisAlignment.start,
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        SizedBox(height: 100),
        ElevatedButton.icon(
            icon: Icon(Icons.camera_alt_outlined),
            onPressed: () => {
                  Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) => CameraState(
                                cameras: cameras,
                              )))
                },
            label: Text('Take photo'),
            style: ElevatedButton.styleFrom(
                fixedSize: Size(200, 80),
                primary: Color(0xFF7F6A93),
                textStyle:
                    TextStyle(fontSize: 18, fontWeight: FontWeight.bold))),
        SizedBox(height: 20),
        ElevatedButton.icon(
            icon: Icon(Icons.photo_library_outlined),
            onPressed: () => {galleryButton()},
            label: Text('Gallery'),
            style: ElevatedButton.styleFrom(
                fixedSize: Size(200, 80),
                primary: Color(0xFF7F6A93),
                textStyle:
                    TextStyle(fontSize: 18, fontWeight: FontWeight.bold)))
      ],
    ));
  }
}
