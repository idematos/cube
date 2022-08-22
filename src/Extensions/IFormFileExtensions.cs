using System.Text;

namespace Cube.Extensions;

public static class IFormFileExtensions
{
    public static List<string> ReadAsList(this IFormFile file)
    {
        var result = new List<string>();
        using (var reader = new StreamReader(file.OpenReadStream()))
        {
            while (reader.Peek() >= 0)
            {
                var line = reader.ReadLine();
                if (line != null) result.Add(line);
            }
        }
        return result;
    }
}