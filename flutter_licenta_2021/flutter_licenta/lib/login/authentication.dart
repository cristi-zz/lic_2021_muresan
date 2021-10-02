import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_core/firebase_core.dart';
import '../routes/routes.dart';
import '../design/colors.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({Key? key}) : super(key: key);
  static const String routeName = '/login';
  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final _formKey = GlobalKey<FormState>();

  late String _password;
  late String _email;
  final snackBar = SnackBar(content: Text('Login succesfully!'));
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(backgroundColor: appBarColor, title: Text('Login')),
        body: Form(
            key: _formKey,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                Padding(
                    padding: EdgeInsets.all(20),
                    child: TextFormField(
                      decoration: InputDecoration(
                          border: OutlineInputBorder(),
                          labelText: 'Enter e-mail'),
                      onSaved: (value) {
                        _email = value!; //get the value entered by user.
                      },
                    )),
                Padding(
                    padding: EdgeInsets.all(20),
                    child: TextFormField(
                      decoration: InputDecoration(
                          border: OutlineInputBorder(),
                          labelText: 'Enter password'),
                      obscureText: true,
                      onSaved: (value) {
                        _password = value!; //get the value entered by user.
                      },
                    )),
                ElevatedButton(
                    child: Text('Login'),
                    onPressed: () async {
                      final form = _formKey.currentState;
                      form!.save();

                      if (form.validate()) {
                        try {
                          await FirebaseAuth.instance
                              .signInWithEmailAndPassword(
                            email: _email,
                            password: _password,
                          );
                          ScaffoldMessenger.of(context).showSnackBar(snackBar);
                          Navigator.pushReplacementNamed(
                              context, pageRoutes.overview);
                        } on FirebaseAuthException catch (e) {
                          showAlert(context, e.toString());
                        }
                      }
                    },
                    style: ElevatedButton.styleFrom(
                        primary: enableButton, minimumSize: Size(200, 50))),
                SizedBox(height: 15),
                ElevatedButton(
                    child: Text('Register'),
                    onPressed: () => {
                          Navigator.push(
                            context,
                            MaterialPageRoute(builder: (context) => Register()),
                          )
                        },
                    style: ElevatedButton.styleFrom(
                        primary: enableButton, minimumSize: Size(200, 50)))
              ],
            )));
  }
}

class Register extends StatefulWidget {
  @override
  _RegisterState createState() => _RegisterState();
}

class _RegisterState extends State<Register> {
  final _auth = FirebaseAuth.instance;
  late String email, password;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(backgroundColor: appBarColor, title: Text('Register')),
        body: Form(
            child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Padding(
                padding: EdgeInsets.all(20),
                child: TextFormField(
                  keyboardType: TextInputType.emailAddress,
                  decoration: InputDecoration(
                      border: OutlineInputBorder(), labelText: 'Enter e-mail'),
                  onChanged: (value) {
                    email = value; //get the value entered by user.
                  },
                )),
            Padding(
                padding: EdgeInsets.all(20),
                child: TextFormField(
                    decoration: InputDecoration(
                        border: OutlineInputBorder(),
                        labelText: 'Enter password'),
                    obscureText: true,
                    onChanged: (value) {
                      password = value; //get the value entered by user.
                    })),
            ElevatedButton(
                child: Text('Register'),
                onPressed: () async {
                  try {
                    var credential = await FirebaseAuth.instance
                        .createUserWithEmailAndPassword(
                            email: email, password: password);
                    Navigator.pop(context);
                  } on FirebaseAuthException catch (e) {
                    showAlert(context, e.toString());
                  }
                },
                style: ElevatedButton.styleFrom(primary: enableButton))
          ],
        )));
  }
}

showAlert(BuildContext context, String text) {
  Widget okButton = TextButton(
    child: Text("OK"),
    onPressed: () {
      Navigator.of(context).pop();
    },
    style: TextButton.styleFrom(primary: enableButton),
  );

  AlertDialog alert = AlertDialog(
    title: Text("Error"),
    content: Text(text),
    actions: [okButton],
  );

  // show the dialog
  showDialog(
    context: context,
    builder: (BuildContext context) {
      return alert;
    },
  );
}
