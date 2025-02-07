

public class q_1 {
    public static int Factorial(int n){
       // Enter your code here
       if(n==0 || n==1){
        return 1
       }
       return n*Factorial(n-1);
    }
    

    public static void main(String[] args) {
        try {
            int n = Integer.parseInt(args[0]);
            System.out.print(Factorial(n)); 
        } catch (NumberFormatException e) {
            System.out.println("Invalid input. Please provide a valid integer.");
        }
    }
}