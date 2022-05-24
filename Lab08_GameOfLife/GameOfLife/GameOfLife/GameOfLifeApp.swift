//
//  GameOfLifeApp.swift
//  GameOfLife
//
//  Created by Tobias Ritscher on 18.05.22.
//

import SwiftUI

@main
struct GameOfLifeApp: App {
    let persistenceController = PersistenceController.shared

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(\.managedObjectContext, persistenceController.container.viewContext)
        }
    }
}
