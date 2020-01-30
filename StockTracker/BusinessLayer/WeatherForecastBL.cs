using StockTracker.Interfaces;
using StockTracker.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StockTracker.BusinessLayer
{
    public class WeatherForecastBL : IWeatherForecast
    {

        private int[] getTempCArr()
        {
            int[] tempCArr = new int[5];

            for (var i = 0; i < 5; i++)
            {
                tempCArr[i] = new Random().Next(-22, 55);
            }
            return tempCArr;
        }
        public IEnumerable<WeatherForecastModel> getdata()
        {
            string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };
            var rng = new Random();
            var tempCArr = getTempCArr();

            return Enumerable.Range(0, 5).Select(index => new WeatherForecastModel
            {
                DateFormatted = DateTime.Now.AddDays(index).ToString("d"),
                TemperatureC = tempCArr[index],
                Summary = Summaries[rng.Next(Summaries.Length)],
                TemperatureF = 32 + (int)(tempCArr[index] / 0.5556)
            });
        }
    }
}
