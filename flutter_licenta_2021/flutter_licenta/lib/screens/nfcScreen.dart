import 'package:flutter/material.dart';
import 'package:flutter_licenta/login/authentication.dart';
import 'package:flutter_licenta/notifiers/functionalityState.dart';
import 'package:provider/provider.dart';
import '../routes/drawerNavigation.dart';
import 'package:flutter_licenta/routes/routes.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:nfc_manager/nfc_manager.dart';
import 'package:bottom_loader/bottom_loader.dart';
import '../design/colors.dart';

class NFCScreen extends StatelessWidget {
  static const String routeName = '/nfcScreen';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          backgroundColor: appBarColor,
          title: Text('NFC'),
          actions: <Widget>[
            IconButton(
                onPressed: () {
                  FirebaseAuth.instance.signOut();
                  Navigator.pushReplacementNamed(context, pageRoutes.login);
                },
                icon: Icon(Icons.exit_to_app_outlined, color: Colors.white))
          ],
        ),
        body: List(),
        drawer: DrawerNavigation());
  }
}

class List extends StatefulWidget {
  const List({Key? key}) : super(key: key);
  @override
  _ListState createState() => _ListState();
}

class _ListState extends State<List> {
  final items = <String>[];

  bool isEnabled = false;
  String title = 'Enable';

  Future<void> nfcRead(BuildContext context) async {
    if (isEnabled == false) {
      setState(() {
        title = 'Disable';
        isEnabled = true;
        Provider.of<FuncState>(context, listen: false).setNFC(true);
      });
    } else {
      setState(() {
        title = 'Enable';
        isEnabled = false;
        Provider.of<FuncState>(context, listen: false).setNFC(false);
      });
    }
    if (isEnabled) {
      BottomLoader bl = new BottomLoader(context, isDismissible: true);
      bl.style(message: 'Scanning NFC...');
      await bl.display();

      bool isAvailable = await NfcManager.instance.isAvailable();

      print(isAvailable);
      if (isAvailable) {
        NfcManager.instance.startSession(onDiscovered: (NfcTag tag) async {
          setState(() {
            items.add(tag.toString());
          });

          NfcManager.instance.stopSession();
          bl.close();
          return;
        });
      } else {
        Future.delayed(Duration(seconds: 5)).whenComplete(() => {
              bl.close(),
              showAlert(context, 'NFC not available. Check if it is enabled')
            });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(mainAxisAlignment: MainAxisAlignment.start, children: [
      Padding(
          padding: const EdgeInsets.all(20),
          child: ElevatedButton(
              child: Text(title),
              onPressed: () => nfcRead(context),
              style: ElevatedButton.styleFrom(
                  primary: isEnabled ? disableButton : enableButton,
                  fixedSize: Size(200, 50)))),
      ListView.builder(
        physics: NeverScrollableScrollPhysics(),
        shrinkWrap: true,
        itemCount: items.length,
        itemBuilder: (context, index) {
          return ListTile(
            title: Text('${items[index]}'),
          );
        },
      )
    ]);
  }
}
