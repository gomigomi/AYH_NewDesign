package com.hungry.score;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ScoreDao {
	static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";  
	static final String DB_URL = "jdbc:mysql://localhost:3306/AYH";

	static final String USER = "root";
	static final String PASS = "900418";
	
	/**
	 * 커넥션 공동 메소드
	 * @returna
	 * @throws ClassNotFoundException
	 */
	public Connection getConnection() throws ClassNotFoundException{
		Connection dbConn = null;
		
		try{
			Class.forName(JDBC_DRIVER);
			dbConn = DriverManager.getConnection(DB_URL,USER,PASS);
			
		}catch(SQLException e){
			e.printStackTrace();
		}
		return dbConn;
	}
	
	public List<HashMap<String, Object>> getBasisScore(String id) {
		Connection conn = null;
		Statement stmt = null;
		List<HashMap<String, Object>> resultContent = new ArrayList<HashMap<String, Object>>();

		try{
		conn = getConnection();
		stmt = conn.createStatement();
		String sql ="SELECT * FROM score where id='"+id+"'";
		ResultSet rs = stmt.executeQuery(sql);

		while(rs.next()){
		HashMap<String, Object> item = new HashMap<String, Object>();
		item.put("id", rs.getString("id"));
		item.put("posting_seq", rs.getString("posting_Seq"));
		item.put("point", rs.getString("point"));

		resultContent.add(item);
		} 

		rs.close();
		stmt.close();
		conn.close();

		}catch(SQLException se){
		se.printStackTrace();
		
		}catch(Exception e){
		e.printStackTrace();

		}finally{}

		return resultContent;
		}

	public List<HashMap<String, Object>> getAllScore() {
		Connection conn = null;
		Statement stmt = null;
		List<HashMap<String, Object>> resultContent = new ArrayList<HashMap<String, Object>>();

		try{
		conn = getConnection();
		stmt = conn.createStatement();
		String sql ="SELECT A.*, count(A.point) as sc_idx "+
					"FROM score as A "+
					"GROUP BY A.posting_seq";
		
		ResultSet rs = stmt.executeQuery(sql);

		while(rs.next()){
		HashMap<String, Object> item = new HashMap<String, Object>();
		item.put("id", rs.getString("id"));
		item.put("posting_seq", rs.getString("posting_Seq"));
		item.put("point", rs.getString("point"));
		item.put("sc_idx", rs.getString("sc_idx"));

		resultContent.add(item);
		} 

		rs.close();
		stmt.close();
		conn.close();

		}catch(SQLException se){
		se.printStackTrace();
		
		}catch(Exception e){
		e.printStackTrace();

		}finally{}

		return resultContent;
		}
	
	public String getScore(String id, String posting_seq) {
		Connection conn = null;
		Statement stmt = null;
		String result = "0";
		
		try{
			conn = getConnection();
			stmt = conn.createStatement();
			String sql ="SELECT * FROM score where id='"+id+"' and posting_seq='"+posting_seq+"'";
			ResultSet rs = stmt.executeQuery(sql);
			
			if(rs.next()){
				result="1";
				}
			rs.close();
			stmt.close();
			conn.close();

		}catch(SQLException se){
			se.printStackTrace();

		}catch(Exception e){
			e.printStackTrace();

		}finally{
		}

		return result;
	}
	
	public String postScore(Map<String, String[]> scoreParam){
		Connection conn = null;
		Statement stmt = null;
		String result = "success";
		try{
			conn = getConnection();
			stmt = conn.createStatement();
			
			String sql= "INSERT INTO score (point, id, posting_seq) "+
						"VALUES('"+scoreParam.get("point")[0].toString()+"', '"+scoreParam.get("id")[0].toString()+"', '"+scoreParam.get("posting_seq")[0].toString()+"')";
				
			stmt.executeUpdate(sql);
		
			stmt.close();
			conn.close();

		}catch(SQLException se){
			se.printStackTrace();
			result = "fail";
		}catch(Exception e){
			e.printStackTrace();
			result = "fail";
		}finally{
			
		}
		return result;
	}

	public String updateScore(Map<String, String[]> scoreParam) {
		Connection conn = null;
		Statement stmt = null;
		String result = "success";
		
		try{
			conn = getConnection();
			stmt = conn.createStatement();
			
			String sql= "UPDATE score SET point ='"+scoreParam.get("point")[0].toString()+"' WHERE score.id='"+scoreParam.get("id")[0].toString()+"' and score.posting_seq='"+scoreParam.get("posting_seq")[0].toString()+"'";	
			stmt.executeUpdate(sql);
		
			stmt.close();
			conn.close();

		}catch(SQLException se){
			se.printStackTrace();
			result = "fail";
		}catch(Exception e){
			e.printStackTrace();
			result = "fail";
		}finally{
			
		}
		return result;
	}
}