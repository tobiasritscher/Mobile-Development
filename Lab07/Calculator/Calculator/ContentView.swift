//
//  ContentView.swift
//  Calculator
//
//  Created by Joël Plambeck on 19.04.22.
//

import SwiftUI


struct ContentView: View {
    @State var numberfield : String = "";
    @State var temp : String = "";
    @State var first : Int = 0;
    @State var second : Int = 0;
    @State var operand : String = "";
    
    var body: some View {
        VStack (spacing:1) {
            Text(numberfield).frame(maxWidth: .infinity, alignment: .leading).padding().background(Color.black).foregroundColor(Color.white)
            Text(temp).frame(maxWidth: .infinity, alignment: .trailing).padding().background(Color.black).foregroundColor(Color.white)
            HStack (spacing:1) {
                Button(action: {
                    self.numberfield = ""
                    self.first = 0
                    self.second = 0
                    self.temp = ""
                }) {Text("AC").frame(maxWidth: .infinity, maxHeight: .infinity)}.background(Color.gray).foregroundColor(Color.white)
                Button(action: {
                    self.numberfield += " -"
                    self.temp += " -"
                }) {Text("+/-").frame(maxWidth: .infinity, maxHeight: .infinity)}.background(Color.gray).foregroundColor(Color.white)
                Button(action: {
                    first = Int(numberfield)!
                    self.numberfield += " % "
                    self.operand = "%"
                    self.temp = ""
                }) {Text("%").frame(maxWidth: .infinity, maxHeight: .infinity)}.background(Color.gray)
                    .foregroundColor(Color.white)
                Button(action: {
                    first = Int(numberfield)!
                    self.numberfield += " / "
                    self.operand = "/"
                    self.temp = ""
                }) {Text("/").frame(maxWidth: .infinity, maxHeight: .infinity)}.background(Color.orange)
                    .foregroundColor(Color.white)
            }
            HStack (spacing:1) {
                Button(action: {
                    self.numberfield += "7"
                    self.temp += "7"
                }) {Text("7").frame(maxWidth: .infinity, maxHeight: .infinity)}.background(Color.black).foregroundColor(Color.white)
                Button(action: {
                    self.numberfield += "8"
                    self.temp += "8"
                }) {Text("8").frame(maxWidth: .infinity, maxHeight: .infinity)}.background(Color.black).foregroundColor(Color.white)
                Button(action: {
                    self.numberfield += "9"
                    self.temp += "9"
                }) {Text("9").frame(maxWidth: .infinity, maxHeight: .infinity)}.background(Color.black)
                    .foregroundColor(Color.white)
                Button(action: {
                    first = Int(numberfield)!
                    self.numberfield += " * "
                    self.operand = "*"
                    self.temp = ""
                }) {Text("*").frame(maxWidth: .infinity, maxHeight: .infinity)}.background(Color.orange)
                    .foregroundColor(Color.white)
            }
            HStack (spacing:1) {
                Button(action: {
                    self.numberfield += "4"
                    self.temp += "4"
                }) {Text("4").frame(maxWidth: .infinity, maxHeight: .infinity)}.background(Color.black).foregroundColor(Color.white)
                Button(action: {
                    self.numberfield += "5"
                    self.temp += "5"
                }) {Text("5").frame(maxWidth: .infinity, maxHeight: .infinity)}.background(Color.black).foregroundColor(Color.white)
                Button(action: {
                    self.numberfield += "6"
                    self.temp += "6"
                }) {Text("6").frame(maxWidth: .infinity, maxHeight: .infinity)}.background(Color.black)
                    .foregroundColor(Color.white)
                Button(action: {
                    first = Int(numberfield)!
                    self.numberfield += " - "
                    self.operand = "-"
                    self.temp = ""
                }) {Text("-").frame(maxWidth: .infinity, maxHeight: .infinity)}.background(Color.orange)
                    .foregroundColor(Color.white)
            }
            HStack (spacing:1) {
                Button(action: {
                    self.numberfield += "1"
                    self.temp += "1"
                }) {Text("1").frame(maxWidth: .infinity, maxHeight: .infinity)}.background(Color.black).foregroundColor(Color.white)
                Button(action: {
                    self.numberfield += "2"
                    self.temp += "2"
                }) {Text("2").frame(maxWidth: .infinity, maxHeight: .infinity)}.background(Color.black).foregroundColor(Color.white)
                Button(action: {
                    self.numberfield += "3"
                    self.temp += "3"
                }) {Text("3").frame(maxWidth: .infinity, maxHeight: .infinity)}.background(Color.black)
                    .foregroundColor(Color.white)
                Button(action: {
                    first = Int(numberfield)!
                    self.numberfield += " + "
                    self.operand = "+"
                    self.temp = ""
                }) {Text("+").frame(maxWidth: .infinity, maxHeight: .infinity)}.background(Color.orange)
                    .foregroundColor(Color.white)
            }
            GeometryReader{ geometry in
            HStack (spacing:1) {
                Button(action: {
                    self.numberfield += "0"
                    self.temp += "0"
                }) {Text("0").frame(maxWidth: .infinity, maxHeight: .infinity)}.background(Color.black).foregroundColor(Color.white)
                Button(action: {self.numberfield += "."}) {Text(".").frame(maxWidth: .infinity, maxHeight: .infinity)}.background(Color.black).foregroundColor(Color.white)
                Button(action: {
                    self.numberfield += " ="
                    switch self.operand {
                    case "+":
                        self.temp = String(self.first + Int(self.temp)!)
                    case "-":
                        self.temp = String(self.first - Int(self.temp)!)
                    case "*":
                        self.temp = String(self.first * Int(self.temp)!)
                    case "/":
                        self.temp = String(self.first / Int(self.temp)!)
                    case "%":
                        self.temp = String(self.first % Int(self.temp)!)
                    default:
                        self.temp = "Error"
                    }
                }) {Text("=").frame(minWidth: 0.5 * geometry.size.width, maxHeight: .infinity)}.background(Color.orange)
                    .foregroundColor(Color.white)
            }
            }
            
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
