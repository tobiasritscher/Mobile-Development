//
//  SearchResults.swift
//  KnowYourMusic
//
//  Created by Tobias Ritscher on 01.03.22.
//

import SwiftUI

struct SearchResults: View {
    @Binding var results: [Result]
    @Binding var searchType: String
    
    var body: some View {
            List(results, id: \.artistId) { item in
                switch item.wrapperType {
                case "artist":
                    NavigationLink(destination: DetailView(item: item, results: [])) {
                        VStack(alignment: .leading) {
                            Text(item.artistName ?? "missing data").font(.headline)
                            Text(item.primaryGenreName ?? "missing data")
                        }
                    }
                case "collection":
                    NavigationLink(destination: DetailView(item: item, results: [])) {
                        HStack {
                            AsyncImage(url: URL(string: item.artworkUrl100 ?? "questionmark.circle.fill"))
                            { image in
                                image.resizable()
                            } placeholder: {
                                ProgressView()
                            }.frame(width: 60, height: 60)
                            VStack(alignment: .leading) {
                                Text(item.collectionName ?? "missing data").font(.headline)
                                Text(item.artistName ?? "missing data")
                                Text("\(stringToDate(dateString: item.releaseDate ?? ""))   Tracks: \(item.trackCount ?? 0)")
                            }
                        }
                    }
                default:
                    NavigationLink(destination: DetailView(item: item, results: [])) {
                        HStack {
                            AsyncImage(url: URL(string: item.artworkUrl100!))
                            { image in
                                image.resizable()
                            } placeholder: {
                                ProgressView()
                            }.frame(width: 60, height: 60)
                            VStack(alignment: .leading) {
                                Text(item.trackName!).font(.headline)
                                Text(item.artistName!)
                                Text(item.collectionName!)
                            }
                        }
                    }
                }
            }
            .navigationTitle("\(searchType)s (\(results.count))")
    }
    
    func stringToDate(dateString: String) -> String {
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "yyyy'-'MM'-'dd'T'HH':'mm':'ssZZZ"
        let date = dateFormatter.date(from: dateString) ?? Date.now
        dateFormatter.dateFormat = "dd'.'MM'.'yyyy"
        
        return dateFormatter.string(from: date)
    }
}
