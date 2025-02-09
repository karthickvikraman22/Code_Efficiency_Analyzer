

public class q_7 {
    public static int Cube_of_a_number(int n){
       // Enter your code here
       return n*n*n;
    }
    

    public static void main(String[] args) {
        try {
            int n = Integer.parseInt(args[0]);
            System.out.print(Cube_of_a_number(n)); 
        } catch (NumberFormatException e) {
            System.out.println("Invalid input. Please provide a valid integer.");
        }
    }
}