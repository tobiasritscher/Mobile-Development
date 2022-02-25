//
//  ContentView.swift
//  KnowYourAnimal
//
//  Created by Tobias Ritscher on 22.02.22.
//

import SwiftUI
import CoreData
import Foundation



struct ContentView: View {
    @State var results = [Result]()
    
    var body: some View {
        return Group {
            if results.count > 0 {
                SearchResults(results: $results)
            } else {
                SearchView(results: $results)
            }
        }
    }
    
}

struct SearchResults: View {
    @Binding var results: [Result]
    
    var body: some View {
        List(results, id: \.trackId) { item in
            VStack(alignment: .leading) {
                Text(item.trackName)
                    .font(.headline)
                Text(item.collectionName)
            }
        }
    }
}



struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView().environment(\.managedObjectContext, PersistenceController.preview.container.viewContext)
    }
}
