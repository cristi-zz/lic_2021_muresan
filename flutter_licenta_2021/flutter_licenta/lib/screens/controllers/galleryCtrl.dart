import 'dart:io';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:camera/camera.dart';
import 'package:path/path.dart' as Path;
import 'package:path_provider/path_provider.dart';
import '../../design/colors.dart';

class GalleryCtrl extends StatefulWidget {
  const GalleryCtrl({Key? key, required this.list}) : super(key: key);
  final list;
  @override
  _GalleryCtrlState createState() => _GalleryCtrlState();
}

class _GalleryCtrlState extends State<GalleryCtrl> {
  final Stream<QuerySnapshot> imagesStream =
      FirebaseFirestore.instance.collection('images').snapshots();
  var list = [];

  void getImages() async {
    final dir = await getApplicationDocumentsDirectory();
    final directory =
        await Directory(dir.path + '/gallery').create(recursive: true);
    print(directory.path);

    setState(() {
      list = Directory(dir.path + '/gallery').listSync();
    });
  }

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    getImages();
  }

  void deleteFile(path) async {
    final appDir = await getApplicationDocumentsDirectory();
    final file = File(path);
    try {
      await file.delete();
      setState(() {
        list.removeWhere((item) => item.path == path);
      });
    } catch (e) {
      print(e);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(backgroundColor: appBarColor, title: Text('Gallery')),
        body: Container(
            child: SingleChildScrollView(
          physics: ScrollPhysics(),
          child: Column(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: <Widget>[
                ListView.separated(
                  physics: NeverScrollableScrollPhysics(),
                  shrinkWrap: true,
                  itemCount: list.length,
                  itemBuilder: (BuildContext context, int index) {
                    return Card(
                      child: Column(children: [
                        Image.file(
                          File(list[index].path),
                        ),
                        ElevatedButton(
                            onPressed: () => {deleteFile(list[index].path)},
                            child: Text('Delete'),
                            style:
                                ElevatedButton.styleFrom(primary: enableButton))
                      ]),
                      margin: EdgeInsets.all(20),
                      elevation: 5,
                      shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(0.0)),
                    );
                  },
                  separatorBuilder: (BuildContext context, int index) {
                    return SizedBox(height: 15);
                  },
                ),
              ]),
        )));
  }
}
