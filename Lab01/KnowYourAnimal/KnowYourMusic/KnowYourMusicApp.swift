
//
//  Created by Tobias Ritscher on 22.02.22.
//

import SwiftUI

@main
struct KnowYourMusicApp: App {
    let persistenceController = PersistenceController.shared
    @State var results = [Result]()

    var body: some Scene {
        WindowGroup {
            SearchView(results: $results)

        }
    }
}
