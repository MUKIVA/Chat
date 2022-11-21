using backend.MockMethods;

namespace BackendTests;

public class Tests
{
    [Fact]
    public void SumTest()
    {
        int expected = 2;
        int actual = MockMethods.Sum(1, 1);

        Assert.Equal(expected, actual);
    }

    [Fact]
    public void DivTest()
    {
        int expected = 1;
        int actual = MockMethods.Div(1, 1);

        Assert.Equal(expected, actual);
    }

    [Fact]
    public void MultTest()
    {
        int expected = 1;
        int actual = MockMethods.Mult(1, 1);

        Assert.Equal(expected, actual);
    }

    [Fact]
    public void SubTest()
    {
        int expected = 0;
        int actual = MockMethods.Sub(1, 1);

        Assert.Equal(expected, actual);
    }
}