//
//  KnowYourAnimalApp.swift
//  KnowYourAnimal
//
//  Created by Tobias Ritscher on 22.02.22.
//

import SwiftUI

@main
struct KnowYourSongwriterApp: App {
    let persistenceController = PersistenceController.shared

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(\.managedObjectContext, persistenceController.container.viewContext)
        }
    }
}
