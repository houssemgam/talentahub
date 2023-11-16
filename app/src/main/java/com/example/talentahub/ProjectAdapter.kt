package com.example.talentahub

import Project
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide

class ProjectAdapter(
    private val eventList: List<Project>,
    private val onItemClickListener: OnItemClickListener
) : RecyclerView.Adapter<ProjectAdapter.EventViewHolder>() {

    interface OnItemClickListener {
        fun onItemClick(event: Project)
    }

    class EventViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val imageViewBackground: ImageView = itemView.findViewById(R.id.imageViewBackground)
        val textViewTitle: TextView = itemView.findViewById(R.id.textViewTitle)
        val textViewLocation: TextView = itemView.findViewById(R.id.textViewLocation)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): EventViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_project, parent, false)
        return EventViewHolder(view)
    }

    override fun onBindViewHolder(holder: EventViewHolder, position: Int) {
        val event = eventList[position]
        holder.textViewTitle.text = event.title
        holder.textViewLocation.text = event.location

        Glide.with(holder.itemView.context)
            .load(event.imageUrl) // Use correct property name
            .centerCrop()
            .into(holder.imageViewBackground)

        holder.itemView.setOnClickListener {
            onItemClickListener.onItemClick(event)
        }
    }


    override fun getItemCount(): Int {
        return eventList.size
    }
}