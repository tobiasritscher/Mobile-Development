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
    
    @State private var wrapperType = "collection"
    
    var body: some View {
        if wrapperType == "collection" {
            List(results, id: \.collectionId) { item in
                switch item.wrapperType {
                case "artist":
                    NavigationLink(destination: DetailView(item: item, results: [], titelId: nil)) {
                        VStack(alignment: .leading) {
                            Text(item.artistName ?? "missing data").font(.headline)
                            Text(item.primaryGenreName ?? "missing data")
                        }
                    }
                case "collection":
                    NavigationLink(destination: DetailView(item: item, results: [], titelId: nil)) {
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
                    NavigationLink(destination: DetailView(item: item, results: [], titelId: nil)) {
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
        } else if wrapperType == "artist" {
            List(results, id: \.artistId) { item in
                switch item.wrapperType {
                case "artist":
                    NavigationLink(destination: DetailView(item: item, results: [], titelId: nil)) {
                        VStack(alignment: .leading) {
                            Text(item.artistName ?? "missing data").font(.headline)
                            Text(item.primaryGenreName ?? "missing data")
                        }
                    }
                case "collection":
                    NavigationLink(destination: DetailView(item: item, results: [], titelId: nil)) {
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
                    NavigationLink(destination: DetailView(item: item, results: [], titelId: nil)) {
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
        } else {
            List(results, id: \.trackId) { item in
                switch item.wrapperType {
                case "artist":
                    NavigationLink(destination: DetailView(item: item, results: [], titelId: nil)) {
                        VStack(alignment: .leading) {
                            Text(item.artistName ?? "missing data").font(.headline)
                            Text(item.primaryGenreName ?? "missing data")
                        }
                    }
                case "collection":
                    NavigationLink(destination: DetailView(item: item, results: [], titelId: nil)) {
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
                    NavigationLink(destination: DetailView(item: item, results: [], titelId: nil)) {
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
            .onAppear() {
                wrapperType = results[0].wrapperType
            }
        }
    }
    
    func stringToDate(dateString: String) -> String {
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "yyyy'-'MM'-'dd'T'HH':'mm':'ssZZZ"
        let date = dateFormatter.date(from: dateString) ?? Date.now
        dateFormatter.dateFormat = "dd'.'MM'.'yyyy"
        
        return dateFormatter.string(from: date)
    }
}
