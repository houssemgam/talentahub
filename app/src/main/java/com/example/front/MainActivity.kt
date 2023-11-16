package com.example.front

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.EditText
import android.widget.Button
import android.graphics.Color



class CreateAccountActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.talentahub)

        // Initialiser les champs de texte
        val titreproEditText: EditText = findViewById<EditText>(R.id.titreproEditText)
        val emailEditText = findViewById<EditText>(R.id.emailEditText)
        val teamtalentEditText = findViewById<EditText>(R.id.teamtalentEditText)
        val carteproEditText = findViewById<EditText>(R.id.carteproEditText)
        val typetalentEditText = findViewById<EditText>(R.id.typetalentEditText)
        val besoinmaterielleEditText = findViewById<EditText>(R.id.besoinmaterielleEditText)
        // Initialiser le bouton « Créer un compte »
        val createmybutton = findViewById<Button>(R.id.mybutton)
        createmybutton.setBackgroundColor(Color.YELLOW)


        createmybutton.setOnClickListener {
            // Obtenir les valeurs des champs de texte
            val titrepro = titreproEditText.text.toString()
            val email = emailEditText.text.toString()
            val teamtalent = teamtalentEditText.text.toString()
            val cartepro = carteproEditText.text.toString()
            val typetalent = typetalentEditText.text.toString()
            val besoinmaterielle = besoinmaterielleEditText.text.toString()

            // Créer un nouveau compte
            // ...
        }
    }
}