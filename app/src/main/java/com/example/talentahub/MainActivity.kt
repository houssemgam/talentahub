package com.example.talentahub

import Project
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView

class MainActivity : AppCompatActivity(), ProjectAdapter.OnItemClickListener {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val filterRecyclerView: RecyclerView = findViewById(R.id.filterRecyclerView)
        filterRecyclerView.layoutManager = LinearLayoutManager(this, LinearLayoutManager.HORIZONTAL, false)

        val filterList = listOf("Today", "Popular", "Upcoming", "Past","Today", "Popular", "Upcoming", "Past")

        val filterAdapter = FilterAdapter(filterList)
        filterRecyclerView.adapter = filterAdapter

        val recyclerView: RecyclerView = findViewById(R.id.recyclerView)
        recyclerView.layoutManager = LinearLayoutManager(this)

        val eventList = getEventList()
        Log.e("tesst",eventList.toString())

        val eventAdapter = ProjectAdapter(eventList, this)
        recyclerView.adapter = eventAdapter
    }

    override fun onItemClick(event: Project) {
        val intent = Intent(this, DetailsEvent::class.java)
        intent.putExtra("EVENT_DATA", event)
        startActivity(intent)
    }


    private fun getEventList(): List<Project> {
        val events = mutableListOf<Project>()
        events.add(Project("https://www.hollywoodreporter.com/wp-content/uploads/2023/02/Drake-pre-Super-Bowl-concert-publicity-H-2023.jpg?w=1296", "Event 1", "Location 1","Aubrey Drake Graham known professionally as Drake, is a Canadian rapper and singer. An influential figure in contemporary popular music"))
        events.add(Project("https://www.hollywoodreporter.com/wp-content/uploads/2023/02/Drake-pre-Super-Bowl-concert-publicity-H-2023.jpg?w=1296", "Event 1", "Location 1","Aubrey Drake Graham known professionally as Drake, is a Canadian rapper and singer. An influential figure in contemporary popular music"))
        events.add(Project("https://www.hollywoodreporter.com/wp-content/uploads/2023/02/Drake-pre-Super-Bowl-concert-publicity-H-2023.jpg?w=1296", "Event 1", "Location 1","Aubrey Drake Graham known professionally as Drake, is a Canadian rapper and singer. An influential figure in contemporary popular music"))
        events.add(Project("https://www.hollywoodreporter.com/wp-content/uploads/2023/02/Drake-pre-Super-Bowl-concert-publicity-H-2023.jpg?w=1296", "Event 1", "Location 1","Aubrey Drake Graham known professionally as Drake, is a Canadian rapper and singer. An influential figure in contemporary popular music"))
        return events
    }
}