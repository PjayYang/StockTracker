using StockTracker.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StockTracker.Interfaces
{
    public interface IWeatherForecast
    {
        IEnumerable<WeatherForecastModel> getdata();
    }
}
