import 'dart:io';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:camera/camera.dart';
import 'package:path_provider/path_provider.dart';
import 'package:path/path.dart' as Path;
import '../../design/colors.dart';

class CameraState extends StatefulWidget {
  const CameraState({Key? key, required this.cameras}) : super(key: key);
  final cameras;
  @override
  _CameraStateState createState() => _CameraStateState();
}

class _CameraStateState extends State<CameraState> {
  late final currentCamera;
  late var currentPhoto;
  late Future<void> initializeCtrlCamera;
  var selectedCamera = false;
  late CameraController ctrlCurrentCamera;

  void initCamera(CameraDescription camera) {
    setState(() {
      ctrlCurrentCamera = CameraController(camera, ResolutionPreset.ultraHigh);
      initializeCtrlCamera = ctrlCurrentCamera.initialize();
    });
  }

  @override
  void initState() {
    super.initState();
    initCamera(widget.cameras[0]);
  }

  @override
  void dispose() {
    super.dispose();
    ctrlCurrentCamera.dispose();
  }

  switchCamera() {
    // if (ctrlCurrentCamera != null) {
    //   ctrlCurrentCamera.dispose();
    // }

    if (selectedCamera) {
      try {
        initCamera(widget.cameras[0]);
      } catch (e) {
        print(e);
      }
    } else {
      try {
        initCamera(widget.cameras[1]);
      } catch (e) {
        print(e);
      }
    }

    selectedCamera = !selectedCamera;
    // ctrlCurrentCamera =
    //     CameraController(widget.cameras[0], ResolutionPreset.ultraHigh);
    // setState(() {
    //   initializeCtrlCamera = ctrlCurrentCamera.initialize();
    //   print('merge');
    // });
  }

  Future<void> takePhoto() async {
    try {
      final image = await ctrlCurrentCamera.takePicture();
      currentPhoto = image;
      showPhotoPreview(image.path);
    } catch (e) {
      print(e);
    }
  }

  Future<void> savePhoto(BuildContext context) async {
    //GallerySaver.saveImage(currentPhoto, albumName: 'Licenta')
    //.then((value) => {Navigator.of(context).pop()});

    final appDir = await getApplicationDocumentsDirectory();
    final filename = Path.basename(currentPhoto.path);
    final path = appDir.path;
    final savedImage =
        await currentPhoto.saveTo('${appDir.path}/gallery/$filename');

    Navigator.of(context).pop();
  }

  Future<void> showPhotoPreview(path) async {
    return showDialog<void>(
        context: context,
        barrierDismissible: false,
        builder: (BuildContext context) {
          return AlertDialog(
            title: const Text(''),
            content: SingleChildScrollView(
              child: Image.file(File(path)),
            ),
            actions: <Widget>[
              ElevatedButton(
                  onPressed: () => savePhoto(context),
                  child: Text('Save'),
                  style: ElevatedButton.styleFrom(primary: enableButton)),
              ElevatedButton(
                  onPressed: () => {Navigator.of(context).pop()},
                  child: Text('Anuleaza'),
                  style: ElevatedButton.styleFrom(primary: enableButton))
            ],
          );
        });
  }

  @override
  Widget build(BuildContext context) {
    return Stack(children: [
      FutureBuilder<void>(
        future: initializeCtrlCamera,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.done) {
            return Container(
                child: CameraPreview(ctrlCurrentCamera),
                height: double.infinity,
                width: double.infinity);
          } else {
            return const Center(child: CircularProgressIndicator());
          }
        },
      ),
      Align(
          alignment: Alignment(0.0, 0.7),
          child: FloatingActionButton(
            onPressed: takePhoto,
            backgroundColor: appBarColor.withOpacity(0.4),
            child: Icon(Icons.camera_enhance_rounded),
          )),
      Positioned(
          top: 0.0,
          left: 0.0,
          right: 0.0,
          child: AppBar(
            title: Text(''),
            leading: IconButton(
              icon: Icon(Icons.arrow_back),
              onPressed: () => {Navigator.pop(context)},
            ),
            actions: [
              IconButton(
                  onPressed: () => {switchCamera()},
                  icon: Icon(Icons.switch_camera_outlined))
            ],
            backgroundColor: Colors.blue.withOpacity(0.0),
            elevation: 0.0,
          )),
    ]);
  }
}

class PhotoPreview extends StatelessWidget {
  const PhotoPreview({Key? key, required this.path}) : super(key: key);
  final path;
  @override
  Widget build(BuildContext context) {
    return Container();
  }
}
