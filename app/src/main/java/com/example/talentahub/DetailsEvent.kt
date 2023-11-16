package com.example.talentahub

import Project
import android.os.Bundle
import android.view.MenuItem
import android.widget.Button
import android.widget.ImageView
import android.widget.TextView
import androidx.appcompat.widget.Toolbar
import androidx.appcompat.app.AppCompatActivity
import com.bumptech.glide.Glide

class DetailsEvent : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_details_event)
        val toolbar = findViewById<Toolbar>(R.id.toolbar)
        setSupportActionBar(toolbar)
        supportActionBar?.setDisplayHomeAsUpEnabled(true)
        supportActionBar?.setDisplayShowHomeEnabled(true)

        // Set custom centered title with black text color
        supportActionBar?.setDisplayShowTitleEnabled(false) // Hide default title
        val customTitle = findViewById<TextView>(R.id.custom_title)
        customTitle.text = "Details"
        customTitle.setTextColor(getColor(android.R.color.black)) // Set text color

        val eventImage = findViewById<ImageView>(R.id.eventImage)
        val eventTitle = findViewById<TextView>(R.id.eventTitle)
        val eventDescription = findViewById<TextView>(R.id.eventDescription)
        val eventLocation = findViewById<TextView>(R.id.eventLocation)
        val bookNowButton = findViewById<Button>(R.id.bookNowButton)

        // Get the event data from the intent
        val event = intent.getParcelableExtra<Project>("EVENT_DATA")

        // Update UI with event data
        event?.let {
            Glide.with(this).load(it.imageUrl).into(eventImage)
            eventTitle.text = it.title
            eventDescription.text = it.description
            eventLocation.text = it.location
        }
    }
    // Handle back button click
    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        if (item.itemId == android.R.id.home) {
            onBackPressed()
            return true
        }
        return super.onOptionsItemSelected(item)
    }
}
