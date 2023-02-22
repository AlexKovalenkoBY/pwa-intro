package com.example;
import java.sql.SQLException;

public class App {

	public static void main(String[] args) throws ClassNotFoundException, SQLException {
		conn.Conn();
		// conn.CreateDB();
		// conn.WriteDB();
		conn.ReadDB();
		conn.CloseDB();
	}
}