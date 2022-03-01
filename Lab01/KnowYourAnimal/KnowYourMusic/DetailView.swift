//
//  DetailView.swift
//  KnowYourMusic
//
//  Created by Tobias Ritscher on 01.03.22.
//

import SwiftUI

struct DetailView: View {
    let item: Result
    
    var body: some View {
        NavigationView {
            Text("Detail view for \(item.trackName).")
                .padding()
        }
    }
}


