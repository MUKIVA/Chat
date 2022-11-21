using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.MockMethods
{
    public static class MockMethods
    {
        public static int Sum(int a, int b) => a + b;
        public static int Sub(int a, int b) => a - b;
        public static int Div(int a, int b) => a / b;
        public static int Mult(int a, int b) => a * b;
    }
}